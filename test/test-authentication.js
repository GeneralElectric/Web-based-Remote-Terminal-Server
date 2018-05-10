const expect = require('chai').expect;
const io = require('socket.io');
const ioclient = require('socket.io-client');
const config = require('../config/config.json');

const serverUrl = `http://localhost:${config.port}`;
var aperture;
var user;

describe('Authentication', function(){
    before(function(done){
        aperture = require('../server/app.js');
        done();
    });

    beforeEach(function(done){
        user = ioclient.connect(serverUrl);
        done();
    });

    afterEach(function(done){
        user.close();
        done();
    });

    after(function(done){
        aperture.close();
        done();
    });

    it('Should authenticate the user when correct credentials are passed', function(done){
        user.on('connect', function(){
            user.emit('authentication', {type: 'device', apertureClientId: '123456789012'});
        });

        user.on('authenticated', function(){
            done();
        });
    });

    it('Should not authenticate the user when no credentials are passed', function(done){
        user.on('connect', function(){
            user.emit('authentication');
        });

        user.on('unauthorized', function(){
            done();
        });
    });

    it('Should not authenticate the user when no credentials.apertureClientId is passed', function(done){
        user.on('connect', function(){
            user.emit('authentication', {type: 'device'});
        });

        user.on('unauthorized', function(){
            done();
        });
    });

    it('Should not authenticate the user when no credentials.type is passed', function(done){
        user.on('connect', function(){
            user.emit('authentication', {apertureClientId: '123456789012'});
        });

        user.on('unauthorized', function(){
            done();
        });
    });
});