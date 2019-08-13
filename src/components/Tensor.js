import * as tf from '@tensorflow/tfjs';

async function getData() {
    const carsDataReq = await fetch('https://storage.googleapis.com/tfjs-tutorials/carsData.json')
    const carsData=await carsDataReq.json()
    const cleaned = carsData.map(car=>({
        mpg:car.Miles_per_Gallon,
        horsepower: car.Horsepower,
    }))
    .filter(car=>(car.mpg!=null&&car.horsepower != null))
    return cleaned
}
function createModel(){
    //Create a a sequential model
    const model = tf.sequential()
    // add a single hidden layer
    model.add(tf.layers.dense({inputShape:[1],units:1,useBias:true}))
    // // extra credit
    // model.add(tf.layers.dense({units:50,activation:'sigmoid'}))
    //add an output layer
    model.add(tf.layers.dense({units:1,useBias:true}))
    
    return model
}
function converToTensor(data){
    return tf.tidy(()=>{
        //step 1. shuffle data
        tf.util.shuffle(data)
        // step 2. convert data to tensor
        const inputs = data.map(d=>d.horsepower)
        const labels = data.map(d=>d.mpg) 
        const inputTensor = tf.tensor2d(inputs, [inputs.length,1])
        const labelTensor = tf.tensor2d(labels,[labels.length,1])
        // step 3. Normalizethe data to the range 0-1 using min-max scaling
        const inputMax = inputTensor.max()
        const inputMin = inputTensor.min()
        const labelMax = labelTensor.max()
        const labelMin = labelTensor.min()

        const normalizedInputs = inputTensor.sub(inputMin).div(inputMax.sub(inputMin))
        const normalizedLabels = labelTensor.sub(labelMin).div(labelMax.sub(labelMin))
        return {
            input: normalizedInputs,
            labels: normalizedLabels,
            // Retrun the min/max bounds so we can use them later
            inputMax,
            inputMin,
            labelMax,
            labelMin
        }
    })
}

function testModel(model, inputData, normalizationData){
    const {inputMax, inputMin, labelMin,labelMax}=normalizationData

    // Generate predictions for a uniform range of numbers between 0 and 1
    // we un-normalize the data by doing the inverse of the min-max scaling
    // that we did earlier
  
        
    
    const [xs, preds] = tf.tidy(()=>{
        const xs = tf.linspace(0,1,100)
        const preds = model.predict(xs.reshape([100,1]))
        const unNormXs= xs
        .mul(inputMax.sub(inputMin))
        .add(inputMin)
        const unNormPreds = preds
        .mul(labelMax.sub(labelMin))
        .add(labelMin)
    
        // un-normalize the data
        return [unNormXs.dataSync(), unNormPreds.dataSync()]
    })
    const predictedPoints = Array.from(xs).map((val,i)=>({
        x:val,
        y:preds[i]
    }))
    const originalPoints = inputData.map(d=>({
        x:d.horsepower,
        y:d.mpg,
    }))
    return predictedPoints
}

export default async function run(){
    const data= await getData()
    // console.log(data)
    const values = data.map(d=>({
        x:d.harosepower,
        y:d.mpg,
    }))
    const model = createModel()
    const convertedInput = converToTensor(data)
    const prediction = testModel(model,data,convertedInput)
    // tfvis.render.scatterplot(
    //     {name:'Horsepower v MPG'},
    //     {values},
    //     {
    //         xLabel: 'Horsepower',
    //         yLabel: 'MPG',
    //         height:300

    //     }
    // )
   
    return(prediction)
}





//document.addEventListener('DOMContentLoaded', run)