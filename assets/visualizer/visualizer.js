 $(document).ready(function () {

     // Button Variables
     var buttonContainer = $("<div>");
     buttonContainer.css("text-align", "center");
     buttonContainer.css("border", ".1rem solid red");
     buttonContainer.css("border-radius", "5px");
     buttonContainer.css("margin", "0 auto");
     buttonContainer.css("display", "table");
     var bar = $("<span>").attr("id", "bar").text("-BAR").css("color", "red");
     var circle = $("<span>").attr("id", "circle").text("-CIRCLE-").css("color", "red");
     var round = $("<span>").attr("id", "round").text("SPEAKER-").css("color", "red");
     buttonContainer.append(bar, circle, round);
     $("#visualizerContainer").append(buttonContainer);

     // Canvas Variables
     var canvas = $("<canvas id='visualizer'><canvas>");
     $("#visualizerContainer").append(canvas);
     canvas = document.getElementById("visualizer");
     var canvasContext = canvas.getContext("2d");
     canvas.width = document.getElementById("visualizerContainer").offsetWidth;
     canvas.height = document.getElementById("visualizerContainer").offsetHeight;
     var height = canvas.height;
     var width = canvas.width;
     console.log("Width: " + canvas.width + " Height: " + canvas.height);
     fillStyle = document.getElementById("visualizerContainer").style.background;

     // Audio Variables
     var audio = document.getElementById("audio");
     audio.crossOrigin = "anonymous";
     audio.load();
     //  var audioContext = new AudioContext();
     var audioContext = new(window.AudioContext || window.webkitAudioContext)();
     var src = audioContext.createMediaElementSource(audio);
     console.log("Audio: " + audio.src);

     // Analyzer Variables
     var id;
     var analyzer = audioContext.createAnalyser();
     var freqArray = new Uint8Array(analyzer.frequencyBinCount);
     src.connect(analyzer);
     analyzer.connect(audioContext.destination);
     analyzer.fftSize = 2048;

     // Visualizer Variables
     var barHeight = 5;
     var barWidth = (canvas.width / analyzer.frequencyBinCount) * 2.5;
     var x, y, x2, y2;

     // Create Bar Default
     clearCanvas();
     renderBarVisualizer();

     // Choose Bar Visualizer
     $("#bar").on("click", function () {
         clearCanvas();
         renderBarVisualizer();
     });

     $("#circle").on("click", function () {
         clearCanvas();
         renderCircleVisualizer();
     });

     $("#round").on("click", function () {
         clearCanvas();
         renderRoundVisualizer();
     });

     //Bar Visualizer
     function renderBarVisualizer() {

         id = requestAnimationFrame(renderBarVisualizer);
         analyzer.getByteFrequencyData(freqArray);

         canvasContext.fillStyle = fillStyle;
         canvasContext.fillRect(0, 0, canvas.width, canvas.height);

         x = canvas.width / 2;
         x2 = x;

         for (var i = 0; i < analyzer.frequencyBinCount; i++) {
             barHeight = freqArray[i] + 5;

             var r = barHeight + (25 * (i / analyzer.frequencyBinCount));
             var g = 250 * (i / analyzer.frequencyBinCount);
             var b = 50;

             canvasContext.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
             canvasContext.fillRect(x, (canvas.height - barHeight * 2) / 2, barWidth, barHeight * 2);
             canvasContext.fillRect(x2, (canvas.height - barHeight * 2) / 2, barWidth, barHeight * 2);

             x += barWidth + 1;
             x2 -= barWidth + 1;
         }
         console.log("Bar Visualizer Created");

     }

     //Circle Visualizer
     function renderCircleVisualizer() {

         id = requestAnimationFrame(renderCircleVisualizer);
         analyzer.getByteFrequencyData(freqArray);

         var center_x = canvas.width / 2;
         var center_y = canvas.height / 2;
         var radius = 400;
         var bars = 200;
         var rads;

         canvasContext.fillStyle = fillStyle;
         canvasContext.fillRect(0, 0, canvas.width, canvas.height);


         for (var i = 0; i < bars; i++) {
             rads = Math.PI * 2 / bars;
             barHeight = freqArray[i] / 2 + 5;

             x = center_x + Math.cos(rads * i) * (radius - barHeight);
             y = center_y + Math.sin(rads * i) * (radius - barHeight);
             x2 = center_x + Math.cos(rads * i) * (radius + barHeight);
             y2 = center_y + Math.sin(rads * i) * (radius + barHeight);

             r = barHeight + (25 * (i / analyzer.frequencyBinCount));
             g = 250 * (i / analyzer.frequencyBinCount);
             b = 50;

             canvasContext.strokeStyle = "rgb(" + r + "," + g + "," + b + ")";
             canvasContext.lineWidth = barWidth;
             canvasContext.beginPath();
             canvasContext.moveTo(x, y);
             canvasContext.lineTo(x2, y2);
             canvasContext.stroke();

         }

         bars = bars * 2;
         for (var i = 0; i < bars; i++) {
             radius = 800
             rads = Math.PI * 2 / bars;
             barHeight = freqArray[i];

             x = center_x + Math.cos(rads * i) * (radius - barHeight);
             y = center_y + Math.sin(rads * i) * (radius - barHeight);
             x2 = center_x + Math.cos(rads * i) * (radius + barHeight);
             y2 = center_y + Math.sin(rads * i) * (radius + barHeight);

             r = barHeight + (25 * (i / analyzer.frequencyBinCount));
             g = 250 * (i / analyzer.frequencyBinCount);
             b = 50;

             canvasContext.strokeStyle = "rgb(" + r + "," + g + "," + b + ")";
             canvasContext.lineWidth = barWidth;
             canvasContext.beginPath();
             canvasContext.moveTo(x, y);
             canvasContext.lineTo(x2, y2);
             canvasContext.stroke();

         }

         console.log("Circle Visualizer Created");
     }

     //Round Visualizer
     function renderRoundVisualizer() {

         id = requestAnimationFrame(renderRoundVisualizer);
         analyzer.getByteFrequencyData(freqArray);

         var center_x = canvas.width / 2;
         var center_y = canvas.height / 2;
         var radius = 1;
         var circles = 50;
         var rads;

         canvasContext.fillStyle = fillStyle;
         canvasContext.fillRect(0, 0, canvas.width, canvas.height);
         canvasContext.beginPath();
         canvasContext.arc(center_x, center_y, radius, 0, 2 * Math.PI);
         canvasContext.stroke();

         for (var i = 0; i < circles; i++) {
             rads = Math.PI * 2 / circles;
             barHeight = freqArray[i];
             radius = freqArray[i];

             r = barHeight + (25 * (i / analyzer.frequencyBinCount));
             g = 250 * (i / analyzer.frequencyBinCount);
             b = 50;

             canvasContext.strokeStyle = "rgb(" + r + "," + g + "," + b + ")";
             canvasContext.lineWidth = barWidth;
             canvasContext.beginPath();
             canvasContext.arc(center_x, center_y, radius + i * 20, i, 2 * Math.PI - i);
             canvasContext.stroke();


         }
         console.log("Round Visualizer Created");
     }

     // Clear Canvas for new visualizer
     function clearCanvas() {
         canvasContext.clearRect(0, 0, width, height);
         cancelAnimationFrame(id);
         console.log("Canvas Cleared");
     }

 });
 //  Spotify
 window.onSpotifyWebPlaybackSDKReady = () => {
     const token = 'BQBBwv2rZZvXAp5i9dYWWlWRLyXDkqMiBcSYgULKA23AQLL_dI3VGssgtu7Npy8cRdvUXUtuYWcN1f9UuOwmCwOFdPc693_p-ovSim8g2vJj6c16xSC3oHhp5zZrVZP4MP3w4_VGZD2h4A3qmEz5sw2xHKDTSjN56A';
     const player = new Spotify.Player({
         name: 'Web Playback SDK Quick Start Player',
         getOAuthToken: cb => {
             cb(token);
         }
     });

     // Error handling
     player.addListener('initialization_error', ({
         message
     }) => {
         console.error(message);
     });
     player.addListener('authentication_error', ({
         message
     }) => {
         console.error(message);
     });
     player.addListener('account_error', ({
         message
     }) => {
         console.error(message);
     });
     player.addListener('playback_error', ({
         message
     }) => {
         console.error(message);
     });

     // Playback status updates
     player.addListener('player_state_changed', state => {
         console.log(state);
     });

     // Ready
     player.addListener('ready', ({
         device_id
     }) => {
         console.log('Ready with Device ID', device_id);
     });

     // Not Ready
     player.addListener('not_ready', ({
         device_id
     }) => {
         console.log('Device ID has gone offline', device_id);
     });

     // Connect to the player!
     player.connect();
 };