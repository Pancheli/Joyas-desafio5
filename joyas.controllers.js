const { runQuery } = require('./db');
const format = require("pg-format");

const prepararHATEOAS = (joyas) => {
    const results = joyas.map((joya) => {
        return {
            name: joya.nombre,
            href: `/joyas/joya/${joya.id}`,
        }
    })
    const totalJoyas = joyas.length
    const totalStock = joyas.reduce((acc, joya) => {
        return acc + joya.stock;
    }, 0)

    const HATEOAS = {
        totalJoyas,
        totalStock,
        results
    }
    return HATEOAS
}

const obtenerJoyas = async ({ limits = 10, order_by = 'id_ASC', page=0}) => {
    const [campo, orden] = order_by.split("_");
    const offset = (page-1) * limits;
    let sql = "SELECT * FROM inventario ORDER BY %s %s LIMIT %s OFFSET %s"
    const joyas = await runQuery(format(sql, campo, orden, limits, offset))
    const HATEOAS = await prepararHATEOAS(joyas);
    return HATEOAS
}

//Filtros
const obtenerJoyasPorFiltro = async ({precio_min, precio_max, categoria, metal}) => {
    let filtros = [];
    if (precio_min) filtros.push(`precio >= ${precio_min}`)
    if (precio_max) filtros.push(`precio <= ${precio_max}`)
    if (categoria) filtros.push(`categoria = '${categoria}'`)
    if (metal) filtros.push(`metal = '${metal}'`)

    let sql = "SELECT * FROM inventario";
    if (filtros.length > 0) {
        filtros = filtros.join(" AND ")
        sql += ` WHERE ${filtros}`
    }
    console.log(sql)
    const joyas = await runQuery(sql);
    return joyas
}

exports.methods = {
    obtenerJoyas,
    obtenerJoyasPorFiltro
}