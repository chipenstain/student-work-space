"use strict";

var teacherNameInput, studentNameInput, roomIdInput, __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
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
};

$(function() {
    var _this = this;
    teacherNameInput = $("#teacher-name"), studentNameInput = $("#student-name"), 
    roomIdInput = $("#roomid"), $("div#teacher-mode").on("click", function() {
        var peerRef;
        "" !== teacherNameInput.val() && (SetLoad(!0), clientName = teacherNameInput.val(), 
        (roomDoc = firestore.collection("rooms").doc()).set({
            theme: ""
        }), roomID = roomDoc.id, $("div#teacher_client span.current-room").text(roomID), 
        $("div#teacher_client span.current-room").on("click", function() {
            navigator.clipboard.writeText($("div#teacher_client span.current-room").text());
        }), clientDoc = roomDoc.collection("teacher").doc(), peerRef = new Peer(ClientType.TEACHER), 
        roomDoc.collection("students").onSnapshot(function(snapshot) {
            return __awaiter(_this, void 0, void 0, function() {
                var _this = this;
                return __generator(this, function(_a) {
                    return snapshot.docChanges().forEach(function(change) {
                        return __awaiter(_this, void 0, void 0, function() {
                            var peer_1, _a, _b;
                            return __generator(this, function(_c) {
                                switch (_c.label) {
                                  case 0:
                                    return "added" !== change.type && "modified" !== change.type ? [ 3, 3 ] : (peer_1 = peers[peers.length - 1]).connection.currentRemoteDescription || null == (_a = change.doc.data()) || !_a.desc ? [ 3, 2 ] : [ 4, peer_1.SetRemoteDescription(change.doc.data().desc, change.doc.data().name) ];

                                  case 1:
                                    _c.sent(), peer_1.id = change.doc.id, peers.forEach(function(peer) {
                                        var _a;
                                        peers.length <= 1 ? (null != (_a = peer.viewport) && _a.container.addClass("size1"), 
                                        null != (_a = peer.viewport) && _a.container.hasClass("size2") ? null != (_a = peer.viewport) && _a.container.removeClass("size2") : null != (_a = peer.viewport) && _a.container.removeClass("size3")) : peers.length <= 4 ? (null != (_a = peer.viewport) && _a.container.addClass("size2"), 
                                        null != (_a = peer.viewport) && _a.container.hasClass("size1") ? null != (_a = peer.viewport) && _a.container.removeClass("size1") : null != (_a = peer.viewport) && _a.container.removeClass("size3")) : (null != (_a = peer.viewport) && _a.container.addClass("size3"), 
                                        null != (_a = peer.viewport) && _a.container.hasClass("size1") ? null != (_a = peer.viewport) && _a.container.removeClass("size1") : null != (_a = peer.viewport) && _a.container.removeClass("size2"));
                                    }), firestore.collection("rooms/" + roomID + "/students/" + change.doc.id + "/candidates").onSnapshot(function(snapshot) {
                                        snapshot.docChanges().forEach(function(change) {
                                            "added" === change.type && (console.log("Got Remote ICE"), 
                                            peer_1.connection.addIceCandidate(new RTCIceCandidate(change.doc.data())));
                                        });
                                    }), console.log("Got new connect"), peers.push(new Peer(ClientType.TEACHER)), 
                                    _c.label = 2;

                                  case 2:
                                    return [ 3, 4 ];

                                  case 3:
                                    "removed" === change.type && ((_a = peers.splice(peers.findIndex(function(x) {
                                        return x.id == change.doc.id;
                                    }), 1)[0]).connection && _a.connection.close(), 
                                    _a.micStream.getTracks().forEach(function(track) {
                                        track.stop();
                                    }), _a.cameraStream.getTracks().forEach(function(track) {
                                        track.stop();
                                    }), _a.screenStream.getTracks().forEach(function(track) {
                                        track.stop();
                                    }), null != (_b = _a.viewport) && _b.container.remove(), 
                                    firestore.collection("rooms/" + roomID + "/students/" + change.doc.id + "/candidates").onSnapshot(function() {})), 
                                    _c.label = 4;

                                  case 4:
                                    return [ 2 ];
                                }
                            });
                        });
                    }), [ 2 ];
                });
            });
        }), roomDoc.collection("query").onSnapshot(function(snapshot) {
            snapshot.docChanges().forEach(function(change) {
                var data_1;
                "added" === change.type && (data_1 = new Array(), "" !== change.doc.data().file ? change.doc.ref.collection("data").get().then(function(snapshot) {
                    snapshot.forEach(function(doc) {
                        data_1.push(doc.data().data);
                    }), CreateQueryElement(change.doc.data().name, change.doc.id, "" !== change.doc.data().file, change.doc.data().file, data_1);
                }) : CreateQueryElement(change.doc.data().name, change.doc.id, "" !== change.doc.data().file, change.doc.data().file));
            });
        }), peers.push(peerRef), teacherNameInput.val(""), studentNameInput.val(""), 
        roomIdInput.val(""), setTimeout(function() {
            ChangeView(VIEWS.TEACHER_CLIENT);
        }, 3e3));
    }), $("div#student-mode").on("click", function() {
        "" !== studentNameInput.val() && "" !== roomIdInput.val() && (roomID = roomIdInput.val(), 
        clientName = studentNameInput.val(), (roomDoc = firestore.collection("rooms").doc(roomID)).get().then(function(doc) {
            return __awaiter(_this, void 0, void 0, function() {
                var _a, _b;
                return __generator(this, function(_c) {
                    switch (_c.label) {
                      case 0:
                        return doc.exists ? (SetLoad(!0), $("div#student_client span.current-room").text(roomID), 
                        $("div#teacher_client span.current-room").on("click", function() {
                            navigator.clipboard.writeText($("div#teacher_client span.current-room").text());
                        }), _b = (_a = $("div#student_client div.theme div.theme")).text, 
                        [ 4, roomDoc.get() ]) : [ 3, 2 ];

                      case 1:
                        return _b.apply(_a, [ _c.sent().data().theme ]), clientDoc = roomDoc.collection("students").doc(), 
                        roomDoc.onSnapshot(function(snapshot) {
                            snapshot.exists && $("div#student_client div.theme div.theme").text(snapshot.data().theme);
                        }), firestore.collection("rooms").onSnapshot(function(snapshot) {
                            snapshot.docChanges().forEach(function(change) {
                                "removed" === change.type && change.doc.id === roomID && Disconnect(ClientType.STUDENT);
                            });
                        }), roomDoc.collection("tasks").onSnapshot(function(snapshot) {
                            snapshot.docChanges().forEach(function(change) {
                                "added" === change.type ? CreateTaskElement(change.doc.data().data) : change.type;
                            });
                        }), roomDoc.collection("files").onSnapshot(function(snapshot) {
                            snapshot.docChanges().forEach(function(change) {
                                "added" === change.type ? CreateFileElement(change.doc.data().data, change.doc.data().data) : change.type;
                            });
                        }), roomDoc.collection("links").onSnapshot(function(snapshot) {
                            snapshot.docChanges().forEach(function(change) {
                                "added" === change.type ? CreateLinkElement(change.doc.data().data) : change.type;
                            });
                        }), peers.push(new Peer(ClientType.STUDENT)), teacherNameInput.val(""), 
                        studentNameInput.val(""), roomIdInput.val(""), setTimeout(function() {
                            ChangeView(VIEWS.STUDENT_CLIENT);
                        }, 3e3), [ 3, 3 ];

                      case 2:
                        roomID = void 0, roomDoc = null, roomIdInput.val("not valid"), 
                        _c.label = 3;

                      case 3:
                        return [ 2 ];
                    }
                });
            });
        }));
    });
});