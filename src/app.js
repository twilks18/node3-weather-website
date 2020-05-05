const path = require('path');
const express = require('express');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');
const hbs = require('hbs'); //Do not need to load when creating only views(see handlebars setup),but is needed for partials

const app = express();
const port = process.env.PORT || 3000;

//Define paths for Express config
const publicDirectory = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');
hbs.registerPartials(partialsPath);


//Setup hanldebars engins and views location
app.set('view engine', 'hbs');
app.set('views', viewPath);

//Setup static directory to serve
app.use(express.static(publicDirectory))
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'TaNeisha Wilks'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'TaNeisha Wilks'
    });
});

app.get('/help',(req, res) =>  {
   res.render( 'help', {
        helpMsg: 'Help is coming!!',
        title:'Help',
        name: 'TaNeisha Wilks'

    });
});

app.get('/weather', (req, res) => {

    if(!req.query.address) {
        return  res.send({
            error: 'Please provide an address.'
        });
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
           return res.send({error});
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error});
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            });
        })
    });

});

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search);
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        error: 'Help article not found.',
        name: 'TaNeisha Wilks'
    });
})
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        error: 'Page not found',
        name: 'TaNeisha'
    });
});




//app.com
//app.com/help
//app.com/about

app.listen(port, () => {
    console.log('Server is up on port ' + port);
});
