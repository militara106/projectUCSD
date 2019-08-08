window.onload = function () {

    // Canvas Variables
    var canvas = document.getElementById("visualizer");
    var canvasContext = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Audio Variables
    var audio = document.getElementById("audio");
    audio.crossOrigin = "anonymous";
    audio.src = "bensound-summer.mp3";
    audio.load();
    var audioContext = new AudioContext();
    var src = audioContext.createMediaElementSource(audio);
    console.log("Audio: " + audio + " Src: " + src);

    // Analyzer Variables
    var analyzer = audioContext.createAnalyser();
    var freqArray = new Uint8Array(analyzer.frequencyBinCount);
    src.connect(analyzer);
    analyzer.connect(audioContext.destination);
    analyzer.fftSize = 2048;

    // Visualizer Variables
    var barHeight = 5;
    var barWidth = (canvas.width / analyzer.frequencyBinCount) * 2.5;
    var x, y, x2, y2;

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

        requestAnimationFrame(renderBarVisualizer);
        analyzer.getByteFrequencyData(freqArray);

        canvasContext.fillStyle = "black";
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

    }

    //Circle Visualizer
    function renderCircleVisualizer() {

        requestAnimationFrame(renderCircleVisualizer);

        var center_x = canvas.width / 2;
        var center_y = canvas.height / 2;
        var radius = 400;
        var bars = 200;
        var rads;

        canvasContext.fillStyle = "black";
        canvasContext.fillRect(0, 0, canvas.width, canvas.height);
        analyzer.getByteFrequencyData(freqArray);

        for (var i = 0; i < bars; i++) {
            rads = Math.PI * 2 / bars;
            barHeight = freqArray[i]/2+5;

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

        bars=bars*2;
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
    }

    //Round Visualizer
    function renderRoundVisualizer() {

        requestAnimationFrame(renderRoundVisualizer);

        var center_x = canvas.width / 2;
        var center_y = canvas.height / 2;
        var radius = 1;
        var circles = 50;
        var rads;

        canvasContext.fillStyle = "black";
        canvasContext.fillRect(0, 0, canvas.width, canvas.height);
        canvasContext.beginPath();
        canvasContext.arc(center_x, center_y, radius, 0, 2 * Math.PI);
        canvasContext.stroke();
        analyzer.getByteFrequencyData(freqArray);

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
            canvasContext.arc(center_x, center_y, radius+i*20, i, 2 * Math.PI-i);
            canvasContext.stroke();


        }
    }

    // Clear Canvas for new visualizer
    function clearCanvas() {
        $('#visualizer').remove()
        $('body').append('<canvas id = "visualizer"></canvas>')

        canvas = document.getElementById("visualizer");
        canvasContext = canvas.getContext("2d");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
}