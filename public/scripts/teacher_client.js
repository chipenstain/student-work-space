"use strict";

var teacherViewport, tasksView, queryContainer, __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
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

function CreateStudentView(name) {
    var viewport = $("<div class='viewport'>"), screenContainer = (teacherViewport.append(viewport), 
    $("<div class='screen'>")), screen = (viewport.append(screenContainer), $("<video autoplay playsinline>")), cameraContainer = (screenContainer.append(screen), 
    $("<div class='camera'>")), screenContainer = (screenContainer.append(cameraContainer), 
    $("<video autoplay playsinline>")), cameraContainer = (cameraContainer.append(screenContainer), 
    $("<audio autoplay>")), nameHolder = (viewport.append(cameraContainer), $("<div class='name'>"));
    return nameHolder.text(name), viewport.append(nameHolder), {
        container: viewport,
        mic: cameraContainer[0],
        camera: screenContainer[0],
        screen: screen[0]
    };
}

function CreateQueryElement(name, id, hasFiles, fileName, fileData) {
    var _this = this, queryElement = $("<div class='query-element'>"), nameHolder = (queryContainer.append(queryElement), 
    $("<span class='title'>")), name = (nameHolder.text(name), queryElement.append(nameHolder), 
    $("<div>")), nameHolder = (queryElement.append(name), $("<button class='btn'>"));
    if (nameHolder.text("Answer"), nameHolder.on("click", function() {
        peers.forEach(function(peer) {
            return __awaiter(_this, void 0, void 0, function() {
                var _a;
                return __generator(this, function(_f) {
                    return peer.id == id ? (peer.micStream.getTracks().forEach(function(track) {
                        track.enabled = !0;
                    }), peer.cameraStream.getTracks().forEach(function(track) {
                        track.enabled = !0;
                    }), peer.screenStream.getTracks().forEach(function(track) {
                        track.enabled = !0;
                    }), null != (_a = peer.viewport) && _a.container.css("display", "flex").show(), 
                    null != (_a = peer.viewport) && _a.container.addClass("size1"), 
                    null != (_a = peer.viewport) && _a.container.hasClass("size2") && null != (_a = peer.viewport) && _a.container.removeClass("size2")) : (peer.micStream.getTracks().forEach(function(track) {
                        track.enabled = !1;
                    }), peer.cameraStream.getTracks().forEach(function(track) {
                        track.enabled = !1;
                    }), peer.screenStream.getTracks().forEach(function(track) {
                        track.enabled = !1;
                    }), null != (_a = peer.viewport) && _a.container.hide()), [ 2 ];
                });
            });
        }), roomDoc.collection("query").doc(id).delete(), queryElement.remove();
    }), name.append(nameHolder), hasFiles) {
        for (var nameHolder = $("<a>"), data = "", i_1 = 0; i_1 < fileData.length; i_1++) data += fileData[i_1];
        for (var arr = new Uint8Array(data.length), i = data.length; i--; ) arr[i] = data.charCodeAt(i);
        hasFiles = new Blob(arr), fileName = (nameHolder.attr("download", fileName), 
        nameHolder.attr("href", URL.createObjectURL(hasFiles)), nameHolder.on("click", function() {
            roomDoc.collection("query").doc(id).delete(), queryElement.remove();
        }), name.append(nameHolder), $("<button class='btn'>"));
        fileName.text("File"), nameHolder.append(fileName);
    }
}

$(function() {
    var _this = this;
    teacherViewport = $("div#teacher_client.content div.main-panel div.general-panel"), 
    tasksView = $("div#teacher_client.content div#tasks-container"), queryContainer = $("div#teacher_client.content div.main-panel div.sub-panel div.query-list div.container"), 
    $("div#teacher_client div.end-call-btn").on("click", function(async) {
        return __awaiter(_this, void 0, void 0, function() {
            return __generator(this, function(_a) {
                return Disconnect(ClientType.TEACHER), [ 2 ];
            });
        });
    }), $("div#teacher_client div.video-btn").on("click", function() {}), $("div#teacher_client div.mic-btn").on("click", function() {}), 
    $("div#teacher_client div.standart-mode").on("click", function() {
        peers.forEach(function(peer) {
            return __awaiter(_this, void 0, void 0, function() {
                var _a;
                return __generator(this, function(_p) {
                    return peer.micStream.getTracks().forEach(function(track) {
                        track.enabled = !1;
                    }), peer.cameraStream.getTracks().forEach(function(track) {
                        track.enabled = !1;
                    }), peer.screenStream.getTracks().forEach(function(track) {
                        track.enabled = !1;
                    }), null != (_a = peer.viewport) && _a.container.css("display", "flex").show(), 
                    peers.length <= 2 ? (null != (_a = peer.viewport) && _a.container.addClass("size1"), 
                    null != (_a = peer.viewport) && _a.container.hasClass("size2") ? null != (_a = peer.viewport) && _a.container.removeClass("size2") : null != (_a = peer.viewport) && _a.container.removeClass("size3")) : peers.length <= 5 ? (null != (_a = peer.viewport) && _a.container.addClass("size2"), 
                    null != (_a = peer.viewport) && _a.container.hasClass("size1") ? null != (_a = peer.viewport) && _a.container.removeClass("size1") : null != (_a = peer.viewport) && _a.container.removeClass("size3")) : (null != (_a = peer.viewport) && _a.container.addClass("size3"), 
                    null != (_a = peer.viewport) && _a.container.hasClass("size1") ? null != (_a = peer.viewport) && _a.container.removeClass("size1") : null != (_a = peer.viewport) && _a.container.removeClass("size2")), 
                    [ 2 ];
                });
            });
        });
    }), $("div#teacher_client div.lection-mode").on("click", function() {
        peers.forEach(function(peer) {
            return __awaiter(_this, void 0, void 0, function() {
                var _a;
                return __generator(this, function(_p) {
                    return peer.micStream.getTracks().forEach(function(track) {
                        track.enabled = !0;
                    }), peer.cameraStream.getTracks().forEach(function(track) {
                        track.enabled = !0;
                    }), peer.screenStream.getTracks().forEach(function(track) {
                        track.enabled = !0;
                    }), null != (_a = peer.viewport) && _a.container.css("display", "flex").show(), 
                    peers.length <= 2 ? (null != (_a = peer.viewport) && _a.container.addClass("size1"), 
                    null != (_a = peer.viewport) && _a.container.hasClass("size2") ? null != (_a = peer.viewport) && _a.container.removeClass("size2") : null != (_a = peer.viewport) && _a.container.removeClass("size3")) : peers.length <= 5 ? (null != (_a = peer.viewport) && _a.container.addClass("size2"), 
                    null != (_a = peer.viewport) && _a.container.hasClass("size1") ? null != (_a = peer.viewport) && _a.container.removeClass("size1") : null != (_a = peer.viewport) && _a.container.removeClass("size3")) : (null != (_a = peer.viewport) && _a.container.addClass("size3"), 
                    null != (_a = peer.viewport) && _a.container.hasClass("size1") ? null != (_a = peer.viewport) && _a.container.removeClass("size1") : null != (_a = peer.viewport) && _a.container.removeClass("size2")), 
                    [ 2 ];
                });
            });
        });
    }), $("div#teacher_client div.tasks").on("click", function() {
        tasksView.css("display", "flex").show();
    }), $("div#teacher_client div#tasks-container div.btn.enabled-btn").on("click", function() {
        roomDoc.update({
            theme: $("div#teacher_client div#tasks-container div.theme a input").val()
        }), tasksView.hide();
    }), $("div#teacher_client div#tasks-container div.btn.tasks").on("click", function() {
        $("div#teacher_client div#tasks-container div.tasks-container").css("display", "flex").show(), 
        $("div#teacher_client div#tasks-container div.files-container").hide(), 
        $("div#teacher_client div#tasks-container div.links-container").hide();
    }), $("div#teacher_client div#tasks-container div.btn.files").on("click", function() {
        $("div#teacher_client div#tasks-container div.files-container").css("display", "flex").show(), 
        $("div#teacher_client div#tasks-container div.tasks-container").hide(), 
        $("div#teacher_client div#tasks-container div.links-container").hide();
    }), $("div#teacher_client div#tasks-container div.btn.links").on("click", function() {
        $("div#teacher_client div#tasks-container div.links-container").css("display", "flex").show(), 
        $("div#teacher_client div#tasks-container div.tasks-container").hide(), 
        $("div#teacher_client div#tasks-container div.files-container").hide();
    }), $("div#teacher_client div#tasks-container div.tasks-container div.control button").on("click", function() {
        var doc = roomDoc.collection("tasks").doc(), task = (doc.set({
            data: $("div#teacher_client div#tasks-container div.tasks-container div.control input").val()
        }), $("<div class='control'>")), label = ($("div#teacher_client div#tasks-container div.tasks-container div.content").append(task), 
        $("<span class='btn'>")), label = (label.text($("div#teacher_client div#tasks-container div.tasks-container div.control input").val()), 
        task.append(label), $("<button class='btn'>"));
        label.text("X"), label.on("click", function() {
            doc.delete(), task.remove();
        }), task.append(label);
    }), $("div#teacher_client div#tasks-container div.files-container div.control button").on("click", function() {
        var doc = roomDoc.collection("files").doc(), file = (doc.set({
            data: $("div#teacher_client div#tasks-container div.files-container div.control input")[0].files[0].name
        }), $("<div class='control'>")), label = ($("div#teacher_client div#tasks-container div.files-container div.content").append(file), 
        $("<span class='btn'>")), label = (label.text($("div#teacher_client div#tasks-container div.files-container div.control input")[0].files[0].name), 
        file.append(label), $("<button class='btn'>"));
        label.text("X"), label.on("click", function() {
            doc.delete(), file.remove();
        }), file.append(label);
    }), $("div#teacher_client div#tasks-container div.links-container div.control button").on("click", function() {
        var doc = roomDoc.collection("links").doc(), link = (doc.set({
            data: $("div#teacher_client div#tasks-container div.links-container div.control input").val()
        }), $("<div class='control'>")), label = ($("div#teacher_client div#tasks-container div.links-container div.content").append(link), 
        $("<span class='btn'>")), label = (label.text($("div#teacher_client div#tasks-container div.links-container div.control input").val()), 
        link.append(label), $("<button class='btn'>"));
        label.text("X"), label.on("click", function() {
            doc.delete(), link.remove();
        }), link.append(label);
    });
});