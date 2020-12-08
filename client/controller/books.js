const API = require('../bin/api');

exports.getList = async (req, res) => {
    const render = {
        page: "books",
        header: "BOOKS",
        objects: [
            {
                key: "books",
                name: "books",
                uri: `${process.env.API_BOOK}`,
                method: 'GET',
                data: {}
            }
        ]
    };

    await API.renderer(req, res, render);
};

exports.get = async (req, res) => {
    let uuid = req.params.uuid;

    const render = {
        page: "book",
        header: "BOOKS",
        objects: []
    };

    if ('new' !== uuid) {
        render.objects.push({
            key: 'book',
            name: 'book',
            uri: `${process.env.API_BOOK}/${uuid}`,
            method: 'GET',
            data: {}
        });
    }

    let responses = await API.responser(req, res, render.objects);

    if (render.objects.length === 0 || Object.keys(responses[200]).length === render.objects.length) {
        render.objects.forEach(object => render[object.key] = responses[200][object.uri][object.name]);
        delete render.objects;

        render.book = render.book || {};

        res.render('pages/'.concat(render.page), render);
    } else {
        return res.redirect(req.path);
    }
};

exports.post = async (req, res) => {
    let uuid = req.params.uuid,
        body = req.body,
        action = body.action;

    if ('new' === action) {
        return res.redirect(req.baseUrl.concat('/new'));
    } else {
        let request = [];
        switch (action) {
            case 'save':
                request.push({uri: `${process.env.API_BOOK}`, method: 'POST', data: {book: body}});
                break;
            case 'update':
                request.push({uri: `${process.env.API_BOOK}/${uuid}`, method: 'PUT', data: {book: body}});
                break;
            case 'delete':
                request.push({uri: `${process.env.API_BOOK}/${uuid}`, method: 'DELETE', data: {}});
                break;
            default:
                return res.redirect(req.originalUrl);
        }

        let responses = await API.responser(req, res, request);

        if (responses.hasOwnProperty(200)) {
            return res.redirect('update' === action ? req.originalUrl : req.baseUrl);
        } else {
            return res.redirect(req.path);
        }
    }
};