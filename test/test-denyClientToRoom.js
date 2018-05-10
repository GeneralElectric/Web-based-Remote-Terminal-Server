const expect = require('chai').expect;
const io = require('socket.io');
const ioclient = require('socket.io-client');
const config = require('../config/config.json');

const serverUrl = `http://localhost:${config.port}`;
var aperture;
var user;
var device;
var duplicateDevice;
const unavailableRoom = '098765432109';

var validDeviceInfo = {
    apertureClientId: '123456789012',
    type: 'device'
};

var validUserInfo = {
    apertureClientId: '212551262',
    type: 'user'
};


describe('Join Room', function(){
    
    before(function(done){
        aperture = require('../server/app.js');
        device = ioclient.connect(serverUrl);

        device.on('connect', function(){
            device.emit('authentication', validDeviceInfo);
        });

        device.on('authenticated', function(){
            device.emit('join room', validDeviceInfo.apertureClientId);
        });

        device.on('joined room', function(){
            done();
        });
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

    it('Should not allow the user to join a room if it is not available', function(done){
        user.on('connect', function(){
            user.emit('authentication', validUserInfo);
        });

        user.on('authenticated', function(){
            user.emit('join room', unavailableRoom);
        });

        user.on('disconnect', function(){
            done();
        })
    });
    
    it('Should not allow a device to join a room that has already been created', function(done){
        duplicateDevice = ioclient.connect(serverUrl);

        duplicateDevice.on('connect', function(){
            duplicateDevice.emit('authentication', validDeviceInfo);
        });

        duplicateDevice.on('authenticated', function(){
            duplicateDevice.emit('join room', validDeviceInfo.apertureClientId);
        });

        duplicateDevice.on('disconnect', function(){
            done();
        });
    });
});