export default()=>({
    environment: process.env.NODE_ENV || 'development',
    database: {
        host: process.env.DATABASE,
        port: parseInt(process.env.DATABASE_PORT,10) ||5432
    }
})