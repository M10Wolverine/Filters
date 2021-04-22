var fgImg=null;
var bgImg=null;
var imgFinal=null;
var imgGrey=null;
var imgRed=null;
var imgSat=null;
var imgNeg =null;
var fgCanv;
var bgCanv;

function uploadFore()
{
  fgCanv= document.getElementById("fgCanv");
  var fileinput = document.getElementById("fgFile");
  fgImg = new SimpleImage(fileinput);
  imgGrey = new SimpleImage(fileinput);
  imgRed= new SimpleImage(fileinput);
  imgSat = new SimpleImage(fileinput);
  imgNeg = new SimpleImage(fileinput);
  fgImg.drawTo(fgCanv);
  alert("Image uploaded");
}
function uploadBack()
{
  bgCanv = document.getElementById("bgCanv");
  var fileinput = document.getElementById("bgFile");
  bgImg = new SimpleImage(fileinput);
  bgImg.drawTo(bgCanv);
  alert("Image uploaded");
}

function doGreenScreen()
{
  if (fgImg == null || !fgImg.complete())
    {
      alert("Foreground Img not loaded");
    }
  if (bgImg == null || !bgImg.complete())
    {
      alert("Background Img not loaded");
    }
  //Resize smaller image to be same as larger
  if (fgImg.getHeight() * fgImg.getWidth() > bgImg.getHeight()*bgImg.getWidth())
    {
      bgImg.setSize(fgImg.getWidth(), fgImg.getHeight());
    }
  else
    {
      fgImg.setSize(bgImg.getWidth(), bgImg.getHeight());
    }
  
  combine();
  
  clearCanv();
  imgFinal.drawTo(fgCanv);
}

function combine()
{
  imgFinal = new SimpleImage(fgImg.getWidth(), bgImg.getHeight());
    for (var x = 0; x<fgImg.getWidth(); x++)
    {
      for (var y = 0; y<fgImg.getHeight(); y++)
        {
          var pixel = fgImg.getPixel(x,y);
          if (pixel.getGreen() > pixel.getBlue()+pixel.getRed())
            {
              imgFinal.setPixel(x,y,bgImg.getPixel(x,y));
            }
          else
            {
              imgFinal.setPixel(x,y,pixel);
            }

        }
    }

}

function clearCanv()
{
  var fgContext=fgCanv.getContext("2d");
  var bgContext=bgCanv.getContext("2d");
  fgContext.clearRect(0,0,fgCanv.width, fgCanv.height);
  bgContext.clearRect(0,0,bgCanv.width, bgCanv.height);
  fgImg=null;
  bgImg=null;
}


function makeGrey()
{
  if (imgGrey==null || !imgGrey.complete())
    {
      alert("Image not loaded");
    }
   greyFilter();
   imgGrey.drawTo(fgCanv);
}

function greyFilter()
{
    for (var x=0; x<imgGrey.getWidth(); x++)
      {
        for (var y=0; y<imgGrey.getHeight(); y++)
          {
          var pixel = imgGrey.getPixel(x,y);
          var avg = (pixel.getGreen()+pixel.getBlue()+pixel.getRed())/3;
          pixel.setGreen(avg);
          pixel.setBlue(avg);
          pixel.setRed(avg);
          }
      }
}

function makeRed()
{
    if (imgRed==null || !imgRed.complete())
    {
      alert("Image not loaded");
    }
  filterRed();
  imgRed.drawTo(fgCanv);
}

function filterRed()
{
  for (var x=0; x<imgRed.getWidth(); x++)
      {
        for (var y=0; y<imgRed.getHeight(); y++)
          {
          var pixel = imgRed.getPixel(x,y);
          var avg = (pixel.getGreen()+pixel.getBlue()+pixel.getRed())/3;
            if (avg<128)
              {
                pixel.setRed(avg*2);
                pixel.setGreen(0);
                pixel.setBlue(0);
              }
            else
              {
                pixel.setRed(255);
                pixel.setGreen(avg*2-255);
                pixel.setBlue(avg*2-255);
              }
          }
      }
}

function makeSat()
{
    if (imgSat==null || !imgSat.complete())
    {
      alert("Image not loaded");
    }
  filterSat();
  imgSat.drawTo(fgCanv);
}

function filterSat()
{
    for (var x=0; x<imgSat.getWidth(); x++)
      {
        for (var y=0; y<imgSat.getHeight(); y++)
          {
            var pixel = imgSat.getPixel(x,y);
            //Find and max the greatest colour
            var blue = pixel.getBlue();
            var red = pixel.getRed();
            var green = pixel.getGreen();
            if (blue> red && blue > green)
              {
                pixel.setBlue(pixel.getBlue*1.01);
              }
            else if (green > red && green > blue)
            {
              pixel.setGreen(pixel.getGreen*1.01);
            }
            else if (red > blue && red > green)
              {
                pixel.setRed(pixel.getRed*1.01);
              }
          }
      }
}

function makeNeg()
{
  if (imgNeg==null || !imgNeg.complete())
    {
      alert("Image not loaded");
    }
   negFilter();
   imgNeg.drawTo(fgCanv);
}

function negFilter()
{
    for (var x=0; x<imgNeg.getWidth(); x++)
      {
        for (var y=0; y<imgNeg.getHeight(); y++)
          {
            var pixel = imgNeg.getPixel(x,y);
            pixel.setGreen(255-pixel.getGreen());
            pixel.setBlue(255-pixel.getBlue());
            pixel.setRed(255-pixel.getRed());
          }
      }
}

function resetImage()
{
  fgImg.drawTo(fgCanv);
  var fileinput = document.getElementById("fgFile");
  imgGrey = new SimpleImage(fileinput);
  imgRed= new SimpleImage(fileinput);
  imgSat = new SimpleImage(fileinput);
  imgNeg = new SimpleImage(fileinput);
}