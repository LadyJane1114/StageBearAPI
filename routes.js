import express from 'express';
import sql from 'mssql';
import 'dotenv/config'



const router = express.Router();

// routes, API endpoints

//get connection string from environ.variable
const dbConnectionString = process.env.AZURE_DB_CONNECTION_STRING;

//GET: /api/shows
router.get('/', async (req, res) => {
    // const shows = [
    //     {id: 1, title: 'Thoroughly Modern Millie', description: 'A musical set in the 1920s', "category": 'musical'},
    //     {id: 2, title: 'Annie', description: 'A musical about an orphan', "category": 'musical'},
    //     {id: 3, title: 'Urinetown', description: 'It is a privilege to pee', "category": 'musical'}
    // ]; SAMPLE CODE, BUT WE'RE NOT USING THAT

    // make sure that any items are correctly URL encoded in the connection string (CODE FROM MSSQL)
        await sql.connect(dbConnectionString)

        const result = await sql.query`SELECT * from [dbo].[Show] s
                INNER JOIN [dbo].[Category] c
                ON s.[CategoryID] = c.[CategoryID]
                INNER JOIN [dbo].[Venue] v
                ON s.[VenueID] = v.[VenueID]
                INNER JOIN [dbo].[Owner] o
                ON s.[OwnerID] = o.[OwnerID]
                ORDER BY s.[Scheduled]`
//NEED TO FIX THE ABOVE WITH THE ACTUAL DATA FROM THE APP'S TABLE - DO IT IN THE SQL THING IN AZURE, IT'LL BE EASIER THERE TO FIGURE OUT.
        
        // console.dir(result)

    res.json(result.recordset);
//    res.send('All shows');
});

//GET: /api/shows/:id
router.get('/:id',(req, res) => {
    const id = req.params.id;

    //sample show object
    const show = {id: id, title: 'Sample Title', description: 'Sample description'};

    res.json(show)

    // res.send(`Show details for show ID: ${id}`);
});

// //GET: /api/shows/hello
// router.get('/hello', (req, res) => {
//   res.send('Hello Express!');
// });

// //GET: /api/shows/goodbye
// router.get('/goodbye', (req, res) => {
//   res.send('Goodbye!');
// });

export default router;