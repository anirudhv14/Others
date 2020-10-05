Perceptron neuralNet;

Point[] points = new Point[150];
int trainingIndex = 0;

void setup(){
  size(800,800);
  neuralNet = new Perceptron(3);
  
  for(int i=0; i<points.length; i++){
    points[i] = new Point();
  }  
}

void draw(){
  background(128);
  
  Point p1 = new Point(-1, f(-1));
  Point p2 = new Point(1, f(1));
  stroke(0,0,255);
  line(p1.pixelX(), p1.pixelY(), p2.pixelX(), p2.pixelY());
  
  stroke(0);
  Point p3 = new Point(-1, neuralNet.guessY(-1));
  Point p4 = new Point(1, neuralNet.guessY(1));
  line(p3.pixelX(), p3.pixelY(), p4.pixelX(), p4.pixelY());
  
  stroke(255);
  for(Point pt : points){
    pt.show();
  }
  
  for(Point pt: points){
    float inputs[] = {pt.x, pt.y, pt.bias};
    int target = pt.label;
    
    int guess = neuralNet.guess(inputs);
    if(guess == target){
      fill(0,255,0);
    }
    else{
      fill(255,0,0);
    }
    noStroke();
    ellipse(pt.pixelX(), pt.pixelY(), 5, 5);
  }
  
  Point training = points[trainingIndex];
  
  float inputs[] = {training.x, training.y, training.bias};
  int target = training.label;
  neuralNet.train(inputs, target);
  trainingIndex++;
  if(trainingIndex == points.length){
     trainingIndex = 0;
  } 
}
