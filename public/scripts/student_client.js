"use strict";

var studentViewport, sendTaskView, filesView, fileInput, tasksHolder, linksHolder, filesHolder, __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
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

function CreateTeacherView(name) {
    var viewport = $("<div class='viewport'>"), screenContainer = (studentViewport.append(viewport), 
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

function CreateTaskElement(task) {
    var taskElement = $("<span class='btn'>");
    taskElement.text(task), tasksHolder.append(taskElement);
}

function CreateLinkElement(link) {
    var linkElement = $("<a class='btn' target='_blank'>");
    linkElement.text(link), linkElement.attr("href", link), linksHolder.append(linkElement);
}

function CreateFileElement(fileName, fileData) {
    var fileElement = $("<a class='btn'>");
    filesHolder.append(fileElement);
}

$(function() {
    var _this = this;
    studentViewport = $("div#student_client.content div.main-panel div.general-panel"), 
    sendTaskView = $("div#student_client.content div#sendtask-container"), filesView = $("div#student_client.content div#files-container"), 
    fileInput = $("div#student_client.content input#sendtaskinput"), tasksHolder = $("div#student_client.content div.query-list.tasks div.tasks"), 
    linksHolder = $("div#student_client.content div#files-container div.links"), 
    filesHolder = $("div#student_client.content div#files-container div.files"), 
    $("div#student_client div.end-call-btn").on("click", function(async) {
        return __awaiter(_this, void 0, void 0, function() {
            return __generator(this, function(_a) {
                return Disconnect(ClientType.STUDENT), [ 2 ];
            });
        });
    }), $("div#student_client div.video-btn").on("click", function() {}), $("div#student_client div.mic-btn").on("click", function() {}), 
    $("div#student_client div.ask").on("click", function() {
        roomDoc.collection("query").doc(clientDoc.id).set({
            name: clientName,
            file: ""
        });
    }), $("div#student_client div.files").on("click", function() {
        filesView.css("display", "flex").show();
    }), $("div#student_client div.send").on("click", function() {
        sendTaskView.css("display", "flex").show();
    }), $("div#student_client div#sendtask-container div.btn").on("click", function() {
        sendTaskView.hide();
    }), $("div#student_client div#files-container div.btn").on("click", function() {
        filesView.hide();
    }), fileInput.on("change", function() {
        var file = fileInput[0].files[0], queryDoc = (console.log("Loaded file is ".concat([ file.name, file.size, file.type, file.lastModified ].join(" "))), 
        roomDoc.collection("query").doc()), fileReader = (queryDoc.set({
            name: clientName,
            file: file.name
        }), new FileReader()), offset = (fileReader.onload = function(e) {
            var arr = new Uint8Array(e.target.result), arr = String.fromCharCode.apply(String, arr);
            queryDoc.collection("data").doc().set({
                data: arr
            }), (offset += e.target.result.byteLength) < file.size && readSlice(offset);
        }, 0), readSlice = function(o) {
            fileReader.readAsArrayBuffer(file.slice(offset, o + 16384));
        };
        readSlice(0);
    });
});