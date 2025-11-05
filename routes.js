import express from 'express';

const router = express.Router();

// routes, API endpoints

//GET: /api/shows
router.get('/', (req, res) => {
    const shows = [
        {id: 1, title: 'Thoroughly Modern Millie', description: 'A musical set in the 1920s'},
        {id: 2, title: 'Annie', description: 'A musical about an orphan'},
        {id: 3, title: 'Urinetown', description: 'It is a privilege to pee'}
    ];
    res.json(shows);
//    res.send('All shows');
});

//GET: /api/shows/:id
router.get('/:id',(req, res) => {
    const id = req.params.id;
    const title = req.params.title;
    const desc = req.params.description;

    //sample show object
    const show = {id: id, title: title, description: desc};

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