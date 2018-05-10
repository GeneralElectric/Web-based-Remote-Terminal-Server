require('../lib/extendArray').extendModule(Array);
const expect = require('chai').expect;
const io = require('socket.io');
const ioclient = require('socket.io-client');
const config = require('../config/config.json');

const serverUrl = `http://localhost:${config.port}`;
var aperture;
var user;
var device;

var validDeviceInfo = {
    apertureClientId: '123456789012',
    type: 'device'
};

var validUserInfo = {
    apertureClientId: '212551262',
    type: 'user'
};


describe('Send and Collect Room List With Available Devices', function(){
    before(function(done){
        aperture = require('../server/app.js');
        device = ioclient.connect(serverUrl);
        user = ioclient.connect(serverUrl);

        device.on('connect', function(){
            device.emit('authentication', validDeviceInfo);
        });

        device.on('authenticated', function(){
            device.emit('join room', validDeviceInfo.apertureClientId);
        });

        device.on('joined room', function(){
            user.emit('join room', validDeviceInfo.apertureClientId);
        });

        user.on('connect', function(){
            user.emit('authentication', validUserInfo);
        });

        user.on('joined room', function(){
            done();
        });
    });

    after(function(done){
        device.close();        
        user.close();
        aperture.close();
        done();
    });

    it('Should give the user a list of one connected device', function(done){
        user.emit('get rooms');
        user.on('room list', function(roomList){
            expect(roomList).to.be.an('array').that.includes(validDeviceInfo.apertureClientId);
            done();
        });
    });
});