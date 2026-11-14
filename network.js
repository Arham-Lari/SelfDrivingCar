class NeuralNetwork{
    constructor(neuronCounts){
        this.levels = [];
        for(let i = 0; i< neuronCounts.length; i++){
            this.levels.push(
                new Level(
                    neuronCounts[i],neuronCounts[i+1]
                )
            );

        }
    }

    static feedforward(givenInputs, network){
        let outputs = Level.feedforward(
            givenInputs,network.levels[0]
        )

        for(let i = 1; i< network.levels.length; i++){
            outputs = Level.feedforward(
                outputs,network.levels[i]
            )
        }

        return outputs;
    }
}

class Level{
    constructor(inputCount,outputCount){
        this.input = new Array(inputCount);
        this.output = new Array(outputCount);
        this.biases = new Array(outputCount);

        this.wights = [];
        for(let i =0 ; i<inputCount; i++){
            this.wights[i] = new Array(outputCount);
        }

        Level.#randomize(this);
    }

    static #randomize(level){
        for(let i = 0; i< level.input.length ; i++){
            for(let j = 0; j < level.output.length; j++){
                level.wights[i][j] = Math.random()*2-1;
            }
        }

        for(let i = 0; i< level.biases; i++){
            level.biases[i] = Math.random()*2-1;
        }
    }

    static feedforward(givenInput,level){
        for(let i = 0; i< level.input.length; i++){
            level.input[i] = givenInput[i];
        }

        for(let i = 0 ; i< level.output.length ; i++){
            let sum = 0;
            for(let j = 0; j< level.input.length; i++){
                sum+= level.input[j]*level.wights[j][i];
            }

            if( sum > level.biases[i]){
                level.output[i] = 1;
            }else{
                level.output[i] = 0;
            }
        }

        return level.output;

    }

}
