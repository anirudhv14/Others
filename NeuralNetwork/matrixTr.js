class Matrix{

  constructor(rows, cols){
    this.rows = rows;
    this.cols = cols;
    this.data = [];
    
    for(let i=0; i<this.rows; i++){
      this.data[i] = [];
      for(let j=0; j<this.cols; j++){
        this.data[i][j] = 0;
      }
    }
  } 
  
  static fromArray(arr){
    let m = new Matrix(arr.length, 1);
    for(let i=0; i<arr.length; i++){
      m.data[i][0] = arr[i];
    }
    return m;
  }
  
  toArray(){
    let arr = [];
    for(let i=0; i<this.rows; i++){
      for(let j=0; j<this.cols; j++){
        arr.push(this.data[i][j]);
      }
    }
    return arr;
  }
  
  randomize(){
    for(let i=0; i<this.rows; i++){
      for(let j=0; j<this.cols; j++){
        this.data[i][j] = Math.random() * 2 - 1;
      }
    }    
  }
  
  static add(m1,m2){
    let m3 = new Matrix(m1.rows,m1.cols);
    for(let i=0; i<m1.rows; i++){
      for(let j=0; j<m1.cols; j++){
        m3.data[i][j] = m1.data[i][j] + m2.data[i][j];
      }
    }
    return m3;
  }
  
  add(n){
    if(n instanceof Matrix){
      for(let i=0; i<this.rows; i++){
        for(let j=0; j<this.cols; j++){
          this.data[i][j] += n.data[i][j];
        }
      }
    }
    else{
      for(let i=0; i<this.rows; i++){
        for(let j=0; j<this.cols; j++){
          this.data[i][j] += n;
        }
      }
    }
  }
  
  static subtract(m1,m2){
    let m3 = new Matrix(m1.rows,m1.cols);
    for(let i=0; i<m1.rows; i++){
      for(let j=0; j<m1.cols; j++){
        m3.data[i][j] = m1.data[i][j] - m2.data[i][j];
      }
    }
    return m3;
  }
  
  subtract(n){
    for(let i=0; i<this.rows; i++){
      for(let j=0; j<this.cols; j++){
        this.data[i][j] -= n;
      }
    }   
  }
  
  static transpose(a){
    let result = new Matrix(a.cols, a.rows);
    for(let i=0; i<a.rows; i++){
      for(let j=0; j<a.cols; j++){
        result.data[j][i] = a.data[i][j];
      }
    }   
    return result;
  }
  
  static multiply(m1,m2){
    if(m1.cols !== m2.rows){
      console.log("Cols and rows do not match");
      return undefined;
    }
    
    let result = new Matrix(m1.rows, m2.cols);
    for(let i=0; i<result.rows; i++){
      for(let j=0; j<result.cols; j++){
        let sum = 0;
        for(let k=0; k<m1.cols; k++){
          sum += m1.data[i][k] * m2.data[k][j];
        }
        result.data[i][j] = sum;
      }
    }
    return result;
  }
  
  multiply(n){
    // Hardamard prod
    if(n instanceof Matrix){
      for(let i=0; i<this.rows; i++){
        for(let j=0; j<this.cols; j++){
          this.data[i][j] *= n.data[i][j];
        }
      }
    }
  // Scalar prod
    else{
      for(let i=0; i<this.rows; i++){
        for(let j=0; j<this.cols; j++){
          this.data[i][j] *= n;
        }
      }
    }
  }
  
  map(func){
    
    for(let i=0; i<this.rows; i++){
      for(let j=0; j<this.cols; j++){
        let val = this.data[i][j];
        this.data[i][j] = func(val);
      }
    }
  }
  
  static map(matrix, func){
    let result = new Matrix(matrix.rows, matrix.cols);
    
    for(let i=0; i<matrix.rows; i++){
      for(let j=0; j<matrix.cols; j++){
        let val = matrix.data[i][j];
        matrix.data[i][j] = func(val);
      }
    }
    return result;
  }
  
  print(){
     console.table(this.data);
  }
}