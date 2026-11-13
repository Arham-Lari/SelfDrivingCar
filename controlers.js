class Controls{
    constructor(type){
        this.forward = false;
        this.backword = false;
        this.right = false ;
        this.left = false;

        //# is used to tell that it is a private method 
        switch(type){
            case "KEY":
                this.#addKeyboardListners();
                break;
            case "DUMMY":
                this.forward = true;
                break;
        }
    }

    #addKeyboardListners(){
        document.onkeydown=(e)=>{
            switch(e.key){

                case "ArrowLeft":
                    this.left=true;
                    break;

                case "ArrowRight":
                    this.right = true;
                    break;

                case "ArrowUp":
                    this.forward = true;
                    break;

                case "ArrowDown":
                    this.backword = true;
                    break;
            }

        }

        document.onkeyup=(e)=>{
            switch(e.key){

                case "ArrowLeft":
                    this.left=false;
                    break;

                case "ArrowRight":
                    this.right = false;
                    break;

                case "ArrowUp":
                    this.forward = false;
                    break;

                case "ArrowDown":
                    this.backword = false;
                    break;
            } 
        }

    }
}
