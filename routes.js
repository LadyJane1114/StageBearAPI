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

        const result = await sql.query`SELECT s.[ShowID], s.[Title], s.[Description], s.[Scheduled], s.[DateRecorded], c.[CategoryID], c.[CategoryTitle], s.[Image], v.[VenueID], v.[VenueName], v.[StreetAddress], v.[City], v.[Region], v.[Country], v.[PostCode], v.[Phone] as VenuePhone, v.[VenueNotes], o.[OwnerID], o.[FName], o.[LName], o.[Pronouns], o.[Organization], o.[Phone] as OwnerPhone, o.[Email], o.[OwnerNotes] from [dbo].[Show] s
            INNER JOIN [dbo].[Category] c
            ON s.[CategoryID] = c.[CategoryID]
            INNER JOIN [dbo].[Venue] v
            ON s.[VenueID] = v.[VenueID]
            INNER JOIN [dbo].[Owner] o
            ON s.[OwnerID] = o.[OwnerID]
            ORDER BY s.[Scheduled]`

    res.json(result.recordset);
//    res.send('All shows');
});

//GET: /api/shows/:id
router.get('/:id', async (req, res) => {

    const id = req.params.id;

    if(isNaN(id)) {
        res.status(400).send('Invalid show ID.');
        return;
    }

    await sql.connect(dbConnectionString)

        const result = await sql.query`SELECT s.[ShowID], s.[Title], s.[Description], s.[Scheduled], s.[DateRecorded], c.[CategoryID], c.[CategoryTitle], s.[Image], v.[VenueID], v.[VenueName], v.[StreetAddress], v.[City], v.[Region], v.[Country], v.[PostCode], v.[Phone] as VenuePhone, v.[VenueNotes], o.[OwnerID], o.[FName], o.[LName], o.[Pronouns], o.[Organization], o.[Phone] as OwnerPhone, o.[Email], o.[OwnerNotes] from [dbo].[Show] s
            INNER JOIN [dbo].[Category] c
            ON s.[CategoryID] = c.[CategoryID]
            INNER JOIN [dbo].[Venue] v
            ON s.[VenueID] = v.[VenueID]
            INNER JOIN [dbo].[Owner] o
            ON s.[OwnerID] = o.[OwnerID]
            WHERE s.[ShowID]=${id}`

    if(result.recordset.length === 0) {
        res.status(404).send('Show not found.');
    }
    else {
        res.json(result.recordset); 
    }

});

export default router;