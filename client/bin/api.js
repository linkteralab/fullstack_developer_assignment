const request = require('request-promise');

/**
 * This method render a page after the responses has been processed.
 * @param req
 * @param res
 * @param renderer
 * @returns {Promise<void>}
 */
exports.renderer = async (req, res, renderer) => {
    //get API responses status by status
    const responses = await callAPI(req, res, renderer.objects);

    //handle responses
    await responseHandler(req, res, responses);

    if (Object.keys(responses[200]).length === renderer.objects.length) {
        //if everything ok create render object with title and info
        const render = {title: renderer.page};

        //set other specific objects to render
        renderer.objects.forEach(object => render[object.key] = responses[200][object.uri][object.name]);

        //render page
        res.render('pages/'.concat(renderer.page), render);
    } else {
        //Has any exception
        return res.redirect(req.path);
    }
};

/**
 * This method returns responses with a status code of 200 after the responses has been processed.
 * @param req
 * @param res
 * @param paths
 * @returns {*}
 */
exports.responser = async (req, res, paths) => {
    let responses = await callAPI(req, res, paths);

    //handle responses
    await responseHandler(req, res, responses);

    //return response if everything ok
    return responses;
};

/**
 * This method send request to API and return responses by status code
 * @param req
 * @param res
 * @param paths This param must be an array and every object must contains uri, method and data
 * @returns {Promise<{}>}
 */
let callAPI = async (req, res, paths) => {
    const responses = {};

    for (const path of paths) {
        //send request to API
        let data = await requestAsync(path.uri, path.method, path.data) || {};

        //if data does not contain status code status code is set to 500
        data.statusCode = data.statusCode || 500;

        if (!responses.hasOwnProperty(data.statusCode)) responses[data.statusCode] = {};

        //collect API response by status code
        if (data.statusCode === 500) {
            //returned error
            responses[data.statusCode][path.uri] = data.error;
        } else if (data.statusCode === 400) {
            //returned 400
        } else if (data.statusCode === 401) {
            //returned 401
        } else if (data.statusCode === 403) {
            //returned 403
            responses[data.statusCode][path.uri] = data.error;
        } else if (data.statusCode === 404) {
            //returned 404
        } else {
            //returned others
            responses[data.statusCode][path.uri] = data;
        }
    }

    return responses;
};

/**
 * This method handle response by status code
 * @param req
 * @param res
 * @param responses
 * @returns {void|*|Response}
 */
let responseHandler = async (req, res, responses) => {
    if (responses.hasOwnProperty(500) && Object.keys(responses[500]).length > 0) {
        //error response
        res.redirect('/500');
    } else if (responses.hasOwnProperty(400) && Object.keys(responses[400]).length > 0) {
        //400 response
        res.redirect('/400');
    } else if (responses.hasOwnProperty(401) && Object.keys(responses[401]).length > 0) {
        //401 response
        res.redirect('/401');
    } else if (responses.hasOwnProperty(403) && Object.keys(responses[403]).length > 0) {
        //403 response
        res.redirect('/403');
    } else if (responses.hasOwnProperty(404) && Object.keys(responses[404]).length > 0) {
        //404 response
        res.redirect('/404');
    }
};

let requestAsync = async (uri, method, data) => {
    console.info("********** CALL ASYNC API **********");
    console.info(`/${method} ${uri}`);

    let options = {
        url: `${process.env.API_URL}${uri}`,
        method: `${method}`,
        json: data,
        resolveWithFullResponse: true
    };

    let resolve = function (response) {
        if (response.body) {
            data = response.body;
        }
        if (response.statusCode) {
            data.statusCode = response.statusCode;
        }
        if (response.error) {
            data.error = response.error.error;
        }

        console.info('response status-->', response && response.statusCode ? response.statusCode : 'XXX');
        console.info("********** END ASYNC API **********");

        return data;
    };

    return await request(options).then(resolve).catch(resolve);
};