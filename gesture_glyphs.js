function letterToXY(letter) {
  var rows = ["qwertyuiop",
              "asdfghjkl",
              "zxcvbnm"];

  for (var i = 0; i < rows.length; i++) {
    var index = rows[i].indexOf(letter);
    if (index >= 0) {
      return {'x': index * 2 + i, 'y': i};
    }
  }
};

function draw() {
  var canvas = document.getElementById('glyphs');
  var width = canvas.width;
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');

    var words = "hello jessica how are you"
    ctx.translate(0,10);
    //ctx.translate(50, 50);
    //drawKeys(ctx);
    //ctx.save();
   // ctx.scale(4,12);
    //drawKeys(ctx);
    //drawWord(ctx, "jessica", false);
    drawWords(ctx, words.split(' '), width, false);
    //ctx.restore();
    //ctx.stroke();
  }
};

function drawKeys(ctx) {
  var letters = "qwertyuiopasdfghjklzxcvbnm";
  for (var i = 0; i < letters.length; i++) {
    var point = letterToXY(letters[i]);
    drawPoint(ctx, point.x, point.y);
  }
}

/**
 * Gets the min and max X value of all the letters in the given word.
 */
function xMinMax(word) {
  var xs = word.split("").map(function(l) {
    var p = letterToXY(l);
    return p.x
  });
  return [Math.min.apply(Math, xs), Math.max.apply(Math, xs)];
}

function drawWords(ctx, words, width, fixedWidth) {
  ctx.save();
  ctx.scale(4, 12);
  ctx.beginPath();

  var maxX = 0;

  for (var i = 0; i < words.length; i++) {
    //var min = 0;
    //var max;

    if (!fixedWidth) {
      // Translate to the left to start near the x position of the left most key
      var minMax = xMinMax(words[i]);
      var min = minMax[0];
      var max = minMax[1];
      ctx.translate(-min + 1, 0);
    }
    drawWord(ctx, words[i], false);
    ctx.translate(18, 0);
    if (!fixedWidth) {
      // Translate to the left to the x position of the rightmost key
      ctx.translate(max - 18, 0);
    }
  }
  ctx.restore();
  ctx.stroke();
}

function drawWord(ctx, word, stroke) {
  //  ctx.beginPath();
  var point = letterToXY(word[0]);
  ctx.moveTo(point.x, point.y);

  for (var i = 1; i < word.length; i++) {
    point = letterToXY(word[i]);
    ctx.lineTo(point.x, point.y);
  }

  if (stroke) {
    ctx.stroke();
  }
}

function drawPoint(ctx, x, y) {
  var sx = 4;
  var sy = 12;
  ctx.fillStyle = "black";
  ctx.beginPath();
  ctx.arc(x*sx, y*sy, 1, 0, Math.PI * 2, true);
  ctx.fill();
}