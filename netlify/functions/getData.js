const { Client } = require("pg");

exports.handler = async function(event, context) {
  const client = new Client({
    user: "root",
    host: "your-database-host",
    database: "granhotel",
    password: "พนนะ",
    port: 5432,
  });

  try {
    await client.connect();
    const res = await client.query("SELECT * FROM your_table");
    await client.end();
    return {
      statusCode: 200,
      body: JSON.stringify(res.rows),
    };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify(error) };
  }
};
