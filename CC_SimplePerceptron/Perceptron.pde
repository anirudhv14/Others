//Activation function
int sign(float n){
  if(n >= 0){
    return 1;
  }
  else{
    return -1;
  }
}

class Perceptron{
  float[] weights;
  float lr = 0.009;
  
  // Constructor
  Perceptron(int n){
    weights = new float[n];
    // Initializing the weights
    for(int i=0; i<weights.length; i++){
      weights[i] = random(-1,1);
    }
  }
  
  int guess(float[] inputs){
    float sum = 0.0;
    for(int i=0; i<weights.length; i++){
      sum += inputs[i] * weights[i];
    }
    
    int output = sign(sum);
    return output;
  }
  
  float guessY(float x){
    float w0 = weights[0];
    float w1 = weights[1];
    float w2 = weights[2];
    
    return -(w2/w1) - (w0/w1) * x;
  }
  
  void train(float[] inputs, int target){
    int guess = guess(inputs);
    int error = target - guess;
    
    for(int i=0; i<weights.length; i++){
      weights[i] += error * inputs[i] * lr;
    }
  }
}
