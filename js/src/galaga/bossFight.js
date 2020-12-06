class BossFight {
    constructor(canvas){
        this.canvas=canvas;
        this.ctx=this.canvas.getContext("2d");
        this.laserDir = ['left','left-mid','mid','mid-open','right-mid','right']
        this.randlaserDir = this.laserDir[Math.floor(Math.random()*this.laserDir.length)]
        this.bossImage = new Image();
        this.bossHealth = 200000;
        this.x=this.canvas.width/2-100;
        this.y=5;
        this.shotsFired=[];
        this.shot;
        this.laserFired=[];
        this.laser;
        this.directionY=1;
        this.directionX=1;
        this.speedX=Math.random()*0.5+0.2;
        this.speedY=Math.random()*0.5;
        this.laserLoad=0;
        this.laserOn=false;
        this.shotX=this.x+100;
        this.shotY=this.y+120;


    }

    looseHealth(){
        this.bossHealth--;
    }

    drawSelf() {
        console.log(this.randlaserDir)
        switch (this.randlaserDir){
            case 'left':
                this.bossImage.src='../../../img/boss_left.png';
                this.bossImage.onload=()=>{
                this.ctx.drawImage(this.bossImage,this.x,this.y)}
                //this.drawLaser(this.randlaserDir);
                
                break;
            case 'left-mid':
                this.bossImage.src='../../../img/boss_left.png';
                this.bossImage.onload=()=>{
                this.ctx.drawImage(this.bossImage,this.x,this.y)}
                
                //this.drawLaser(this.randlaserDir);
                break;
            case 'mid':
                this.bossImage.src='../../../img/boss_middle.png';
                this.bossImage.onload=()=>{
                this.ctx.drawImage(this.bossImage,this.x,this.y)}
                //this.drawLaser(this.randlaserDir);
                
                break;
            case 'mid-open':
                this.bossImage.src='../../../img/boss_middle_open.png';
                this.bossImage.onload=()=>{
                    this.ctx.drawImage(this.bossImage,this.x,this.y)}
                //this.drawLaser(this.randlaserDir);
                break;
            case 'right-mid':
                this.bossImage.src='../../../img/boss_right.png';
                this.bossImage.onload=()=>{
                    this.ctx.drawImage(this.bossImage,this.x,this.y)}
                //this.drawLaser(this.randlaserDir);
                
                break;
            case 'mid':
                this.bossImage.src='../../../img/boss_right.png';
                this.bossImage.onload=()=>{
                    this.ctx.drawImage(this.bossImage,this.x,this.y)}
                //this.drawLaser(this.randlaserDir);
               
                break
        }
        this.updateSelf();

    }


    drawShot() {
        this.ctx.fillStyle = "#e83bad";
        this.ctx.arc(this.shotX,this.shotY,15,0,Math.PI*2)
        this.updateShot();
    }

    


    updateSelf() {
        let rando = Math.floor(Math.random()*2);
        let newDir;
        if (rando<1){
            newDir = -1;
        } else{
            newDir = 1;
        }
        if (this.y<=0){
            this.directionY=1
            this.directionX=newDir;
        } else if(this.y>=250){
            this.directionY=-1;
            this.directionX=newDir;
        }
        if(this.x>=400){
            this.directionX=-1;
            this.directionY=newDir;
        } else if (this.x<=0){
            this.directionX=1;
            this.directionY=newDir;
        }
        this.x+=this.speedX*this.directionX;
        this.y+=this.speedY*this.directionY;
    }

    updateShot() {
        this.shotY+=-5;
    }


    updateTimes() {
        this.laserLoad ++;
        if(this.laserLoad%5000==0){
            this.laserOn=true;
            setTimeout(()=>{this.laserOn=false},1000)
        } 
    }


}