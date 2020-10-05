function sigmoid(x){
  return 1 / (1 + Math.exp(-x));
}

function sigmoidDerivative(y){
  return y * (1 - y);
}

class NeuralNetwork{
  constructor(numI, numH, numO){
    this.input_nodes = numI;
    this.hidden_nodes = numH;
    this.output_nodes = numO;
    
    this.weights_ih = new Matrix(this.hidden_nodes, this.input_nodes);
    this.weights_ho = new Matrix(this.output_nodes, this.hidden_nodes);
    this.weights_ih.randomize();
    this.weights_ho.randomize();
    
    this.bias_h = new Matrix(this.hidden_nodes,1);
    this.bias_o = new Matrix(this.output_nodes,1);
    this.bias_h.randomize();
    this.bias_o.randomize();
    
    this.learning_rate = 0.1;
  }
  
  feedforward(input_array){
    // Generation of hidden outputs
    let inputs = Matrix.fromArray(input_array);
    let hidden = Matrix.multiply(this.weights_ih, inputs);
    
    hidden.add(this.bias_h);
    hidden.map(sigmoid);
    
    let output = Matrix.multiply(this.weights_ho, hidden);
    output.add(this.bias_o);
    output.map(sigmoid);
    
    return output.toArray();
  }
  
  train(input_array, targets_array){
    
    let inputs = Matrix.fromArray(input_array);
    let hidden = Matrix.multiply(this.weights_ih, inputs);
    hidden.add(this.bias_h);
    hidden.map(sigmoid);
    
    let outputs = Matrix.multiply(this.weights_ho, hidden);
    outputs.add(this.bias_o);
    outputs.map(sigmoid);
    
    let targets = Matrix.fromArray(targets_array);
    
    // Error calc.
    let output_errors = Matrix.subtract(targets, outputs);
    
    // Gradient calc:
    let output_gradients = Matrix.map(outputs,sigmoidDerivative);
    output_gradients.multiply(output_errors);
    output_gradients.multiply(this.learning_rate);
        
    // Delta calc.
    let hidden_T = Matrix.transpose(hidden);
    let weights_ho_deltas = Matrix.multiply(output_gradients, hidden_T);
    
    // Weight adjusting by deltas
    this.weights_ho.add(weights_ho_deltas);
    // Bias adjusting by deltas
    this.bias_o.add(output_gradients);
    
    
    // Hidden layer error calc.
    let who_t = Matrix.transpose(this.weights_ho);
    let hidden_errors = Matrix.multiply(who_t, output_errors);
    
    // Hidden gradient calc.
    let hidden_gradients = Matrix.map(hidden, sigmoidDerivative); 
    hidden_gradients.multiply(hidden_errors);
    hidden_gradients.multiply(this.learning_rate);
        
    // Calculation of deltas
    let input_T = Matrix.transpose(inputs);
    let weight_ih_deltas = Matrix.multiply(hidden_gradients, input_T);
    
    // Weight adjusting by deltas
    this.weights_ih.add(weight_ih_deltas);
    // Bias adjusting by deltas
    this.bias_h.add(hidden_gradients);
    
    //outputs.print();
    //targets.print();
    //output_errors.print();
    //hidden_errors.print();
    
  }
  
} 