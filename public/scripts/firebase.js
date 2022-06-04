"use strict";

var firestore, roomID, roomDoc, clientDoc, clientName, ClientType, __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
    return new (P = P || Promise)(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator.throw(value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            var value;
            result.done ? resolve(result.value) : ((value = result.value) instanceof P ? value : new P(function(resolve) {
                resolve(value);
            })).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}, __generator = this && this.__generator || function(thisArg, body) {
    var f, y, t, _ = {
        label: 0,
        sent: function() {
            if (1 & t[0]) throw t[1];
            return t[1];
        },
        trys: [],
        ops: []
    }, g = {
        next: verb(0),
        throw: verb(1),
        return: verb(2)
    };
    return "function" == typeof Symbol && (g[Symbol.iterator] = function() {
        return this;
    }), g;
    function verb(n) {
        return function(v) {
            var op = [ n, v ];
            if (f) throw new TypeError("Generator is already executing.");
            for (;_; ) try {
                if (f = 1, y && (t = 2 & op[0] ? y.return : op[0] ? y.throw || ((t = y.return) && t.call(y), 
                0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                switch (y = 0, (op = t ? [ 2 & op[0], t.value ] : op)[0]) {
                  case 0:
                  case 1:
                    t = op;
                    break;

                  case 4:
                    return _.label++, {
                        value: op[1],
                        done: !1
                    };

                  case 5:
                    _.label++, y = op[1], op = [ 0 ];
                    continue;

                  case 7:
                    op = _.ops.pop(), _.trys.pop();
                    continue;

                  default:
                    if (!(t = 0 < (t = _.trys).length && t[t.length - 1]) && (6 === op[0] || 2 === op[0])) {
                        _ = 0;
                        continue;
                    }
                    if (3 === op[0] && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (6 === op[0] && _.label < t[1]) {
                        _.label = t[1], t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2], _.ops.push(op);
                        break;
                    }
                    t[2] && _.ops.pop(), _.trys.pop();
                    continue;
                }
                op = body.call(thisArg, _);
            } catch (e) {
                op = [ 6, e ], y = 0;
            } finally {
                f = t = 0;
            }
            if (5 & op[0]) throw op[1];
            return {
                value: op[0] ? op[1] : void 0,
                done: !0
            };
        };
    }
}, firebaseConfig = {
    apiKey: "AIzaSyB7mBXTD7lY7s-cRBBfixAjSp5zBSrlDl8",
    authDomain: "studentworkspace-21fb2.firebaseapp.com",
    projectId: "studentworkspace-21fb2",
    storageBucket: "studentworkspace-21fb2.appspot.com",
    messagingSenderId: "771149651600",
    appId: "1:771149651600:web:e575c23e589687d44dc215"
}, servers = {
    iceServers: [ {
        urls: [ "stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302" ]
    } ],
    iceCandidatePoolSize: 10
}, peers = new Array(), Peer = (!function(ClientType) {
    ClientType.TEACHER = "teacher", ClientType.STUDENT = "student";
}(ClientType = ClientType || {}), function() {
    function Peer(type, id) {
        var _this = this;
        id && (this.id = id), this.type = type, this.viewport = null, this.streamCount = 0, 
        this.micStream = new MediaStream(), this.cameraStream = new MediaStream(), 
        this.screenStream = new MediaStream(), this.remoteMicStream = new MediaStream(), 
        this.remoteCameraStream = new MediaStream(), this.remoteScreenStream = new MediaStream(), 
        this.GetUserMedia().then(function() {
            return __awaiter(_this, void 0, void 0, function() {
                var teacherData, _this = this;
                return __generator(this, function(_a) {
                    switch (_a.label) {
                      case 0:
                        return this.connection = new RTCPeerConnection(servers), 
                        this.connection.onicecandidate = function(event) {
                            event.candidate ? (console.log("Got candidate: ", event.candidate), 
                            clientDoc.collection("candidates").add(event.candidate.toJSON())) : console.log("Got finale candidate");
                        }, this.micStream.getAudioTracks().forEach(function(track) {
                            _this.connection.addTrack(track, _this.micStream);
                        }), this.cameraStream.getVideoTracks().forEach(function(track) {
                            _this.connection.addTrack(track, _this.cameraStream);
                        }), this.screenStream.getTracks().forEach(function(track) {
                            _this.connection.addTrack(track, _this.screenStream);
                        }), this.connection.ontrack = function(event) {
                            0 === _this.streamCount ? (event.streams[0].getTracks().forEach(function(track) {
                                _this.remoteMicStream.addTrack(track);
                            }), _this.viewport.mic.srcObject = _this.remoteMicStream) : 1 === _this.streamCount ? (event.streams[0].getTracks().forEach(function(track) {
                                _this.remoteCameraStream.addTrack(track);
                            }), _this.viewport.camera.srcObject = _this.remoteCameraStream) : 2 === _this.streamCount && (event.streams[0].getTracks().forEach(function(track) {
                                _this.remoteScreenStream.addTrack(track);
                            }), _this.viewport.screen.srcObject = _this.remoteScreenStream), 
                            _this.streamCount++;
                        }, type !== ClientType.STUDENT ? [ 3, 3 ] : [ 4, roomDoc.collection("teacher").get() ];

                      case 1:
                        return teacherData = _a.sent().docs[0].data(), this.viewport = CreateTeacherView(teacherData.name), 
                        [ 4, this.SetRemoteDescription(teacherData.desc) ];

                      case 2:
                        return _a.sent(), this.connection.createAnswer().then(function(desc) {
                            return __awaiter(_this, void 0, void 0, function() {
                                return __generator(this, function(_a) {
                                    switch (_a.label) {
                                      case 0:
                                        return [ 4, this.connection.setLocalDescription(desc) ];

                                      case 1:
                                        return _a.sent(), [ 4, clientDoc.set({
                                            name: clientName
                                        }) ];

                                      case 2:
                                        return _a.sent(), [ 4, clientDoc.update({
                                            desc: {
                                                sdp: desc.sdp,
                                                type: desc.type
                                            }
                                        }) ];

                                      case 3:
                                        return _a.sent(), console.log("Got room"), 
                                        [ 2 ];
                                    }
                                });
                            });
                        }), [ 3, 4 ];

                      case 3:
                        type === ClientType.TEACHER && this.connection.createOffer().then(function(desc) {
                            return __awaiter(_this, void 0, void 0, function() {
                                return __generator(this, function(_a) {
                                    switch (_a.label) {
                                      case 0:
                                        return [ 4, this.connection.setLocalDescription(desc) ];

                                      case 1:
                                        return _a.sent(), [ 4, clientDoc.set({
                                            name: clientName
                                        }) ];

                                      case 2:
                                        return _a.sent(), [ 4, clientDoc.update({
                                            desc: {
                                                sdp: desc.sdp,
                                                type: desc.type
                                            }
                                        }) ];

                                      case 3:
                                        return _a.sent(), console.log("New room created with SDP offer. Room ID: ".concat(roomDoc.id)), 
                                        [ 2 ];
                                    }
                                });
                            });
                        }), _a.label = 4;

                      case 4:
                        return type === ClientType.STUDENT && firestore.collection("rooms/" + roomID + "/teacher/" + this.GetRemoteID() + "/candidates").onSnapshot(function(snapshot) {
                            snapshot.docChanges().forEach(function(change) {
                                "added" === change.type && _this.connection.addIceCandidate(new RTCIceCandidate(change.doc.data()));
                            });
                        }), [ 2 ];
                    }
                });
            });
        });
    }
    return Peer.prototype.SetRemoteDescription = function(description, name) {
        this.connection.setRemoteDescription(new RTCSessionDescription(description)), 
        this.type === ClientType.TEACHER && (this.viewport = CreateStudentView(name));
    }, Peer.prototype.GetUserMedia = function() {
        return __awaiter(this, void 0, void 0, function() {
            var _this = this;
            return __generator(this, function(_a) {
                switch (_a.label) {
                  case 0:
                    return [ 4, navigator.mediaDevices.getUserMedia({
                        audio: !0
                    }).then(function(s) {
                        s.getAudioTracks().forEach(function(track) {
                            _this.micStream.addTrack(track);
                        });
                    }) ];

                  case 1:
                    return _a.sent(), [ 4, navigator.mediaDevices.getUserMedia({
                        video: !0
                    }).then(function(s) {
                        s.getVideoTracks().forEach(function(track) {
                            _this.cameraStream.addTrack(track);
                        });
                    }) ];

                  case 2:
                    return _a.sent(), this.type !== ClientType.STUDENT ? [ 3, 4 ] : [ 4, navigator.mediaDevices.getDisplayMedia({
                        video: !0,
                        audio: !0
                    }).then(function(s) {
                        s.getTracks().forEach(function(track) {
                            _this.screenStream.addTrack(track);
                        });
                    }) ];

                  case 3:
                    return _a.sent(), [ 3, 5 ];

                  case 4:
                    this.type, ClientType.TEACHER, _a.label = 5;

                  case 5:
                    return [ 2 ];
                }
            });
        });
    }, Peer.prototype.GetRemoteID = function() {
        return __awaiter(this, void 0, void 0, function() {
            return __generator(this, function(_a) {
                switch (_a.label) {
                  case 0:
                    return [ 4, roomDoc.collection("teacher").get() ];

                  case 1:
                    return [ 2, _a.sent().docs[0].id ];
                }
            });
        });
    }, Peer;
}());

function Disconnect(type) {
    return __awaiter(this, void 0, void 0, function() {
        var _this = this;
        return __generator(this, function(_a) {
            switch (_a.label) {
              case 0:
                return (SetLoad(!0), peers.forEach(function(peer) {
                    return __awaiter(_this, void 0, void 0, function() {
                        var _a, _this = this;
                        return __generator(this, function(_b) {
                            switch (_b.label) {
                              case 0:
                                return (peer.connection.close(), peer.micStream.getTracks().forEach(function(track) {
                                    track.stop();
                                }), peer.cameraStream.getTracks().forEach(function(track) {
                                    track.stop();
                                }), peer.screenStream.getTracks().forEach(function(track) {
                                    track.stop();
                                }), null != (_a = peer.viewport) && _a.container.remove(), 
                                type !== ClientType.STUDENT) ? [ 3, 2 ] : (firestore.collection("rooms/" + roomID + "/teacher/" + peer.GetRemoteID() + "/candidates").onSnapshot(function() {}), 
                                [ 4, firestore.collection("rooms/" + roomID + "/students/" + clientDoc.id + "/candidates").get() ]);

                              case 1:
                                return _b.sent().docs.forEach(function(doc) {
                                    return __awaiter(_this, void 0, void 0, function() {
                                        return __generator(this, function(_a) {
                                            switch (_a.label) {
                                              case 0:
                                                return [ 4, doc.ref.delete() ];

                                              case 1:
                                                return _a.sent(), [ 2 ];
                                            }
                                        });
                                    });
                                }), [ 3, 4 ];

                              case 2:
                                return type !== ClientType.TEACHER ? [ 3, 4 ] : [ 4, firestore.collection("rooms/" + roomID + "/teacher/" + clientDoc.id + "/candidates").get() ];

                              case 3:
                                _b.sent().docs.forEach(function(doc) {
                                    return __awaiter(_this, void 0, void 0, function() {
                                        return __generator(this, function(_a) {
                                            switch (_a.label) {
                                              case 0:
                                                return [ 4, doc.ref.delete() ];

                                              case 1:
                                                return _a.sent(), [ 2 ];
                                            }
                                        });
                                    });
                                }), _b.label = 4;

                              case 4:
                                return [ 2 ];
                            }
                        });
                    });
                }), peers = [], type !== ClientType.STUDENT) ? [ 3, 2 ] : (roomDoc.onSnapshot(function() {}), 
                firestore.collection("rooms").onSnapshot(function() {}), sendTaskView.hide(), 
                filesView.hide(), [ 4, clientDoc.delete() ]);

              case 1:
                return _a.sent(), [ 3, 9 ];

              case 2:
                return type !== ClientType.TEACHER ? [ 3, 9 ] : (roomDoc.collection("students").onSnapshot(function() {}), 
                roomDoc.collection("query").onSnapshot(function() {}), [ 4, roomDoc.collection("query").get() ]);

              case 3:
                return _a.sent().docs.forEach(function(doc) {
                    return __awaiter(_this, void 0, void 0, function() {
                        return __generator(this, function(_a) {
                            switch (_a.label) {
                              case 0:
                                return [ 4, doc.ref.delete() ];

                              case 1:
                                return _a.sent(), [ 2 ];
                            }
                        });
                    });
                }), [ 4, roomDoc.collection("tasks").get() ];

              case 4:
                return _a.sent().docs.forEach(function(doc) {
                    return __awaiter(_this, void 0, void 0, function() {
                        return __generator(this, function(_a) {
                            switch (_a.label) {
                              case 0:
                                return [ 4, doc.ref.delete() ];

                              case 1:
                                return _a.sent(), [ 2 ];
                            }
                        });
                    });
                }), [ 4, roomDoc.collection("links").get() ];

              case 5:
                return _a.sent().docs.forEach(function(doc) {
                    return __awaiter(_this, void 0, void 0, function() {
                        return __generator(this, function(_a) {
                            switch (_a.label) {
                              case 0:
                                return [ 4, doc.ref.delete() ];

                              case 1:
                                return _a.sent(), [ 2 ];
                            }
                        });
                    });
                }), [ 4, roomDoc.collection("files").get() ];

              case 6:
                return _a.sent().docs.forEach(function(doc) {
                    return __awaiter(_this, void 0, void 0, function() {
                        return __generator(this, function(_a) {
                            switch (_a.label) {
                              case 0:
                                return [ 4, doc.ref.delete() ];

                              case 1:
                                return _a.sent(), [ 2 ];
                            }
                        });
                    });
                }), queryContainer.children().remove(), tasksView.hide(), [ 4, clientDoc.delete() ];

              case 7:
                return _a.sent(), [ 4, roomDoc.delete() ];

              case 8:
                _a.sent(), _a.label = 9;

              case 9:
                return ChangeView(VIEWS.HOME), [ 2 ];
            }
        });
    });
}

$(function() {
    firebase.initializeApp(firebaseConfig), firestore = firebase.firestore();
});