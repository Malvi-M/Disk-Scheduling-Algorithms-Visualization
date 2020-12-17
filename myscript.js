$(function () { 
        $("#navbarToggle").blur(function (event) {
          var screenWidth = window.innerWidth;
          if (screenWidth < 768) {
            $("#collapsable-nav").collapse('hide');
          }
        });
    
        $("#navbarToggle").click(function (event) {
          $(event.target).focus();
        });
});
         
    
$("#animate-button").click(function() {
        var btn1 = document.getElementById("animate-button");
        btn1.disabled= true;
        var b = document.forms["myForm"]["bitstream-input"].value;
        var i = document.forms["myForm"]["initial-input"].value;
        if(b == ""){
                alert("Enter the Sequence of Request queue!");
                return false;
        }
        if (b!= "" && i == "") {
                alert("Enter the value of Initial Cylinder!");
                return false;
        }
    
        var ini = parseInt(document.getElementById('initial-input').value);
        var final =  parseInt(document.getElementById('final-input').value);
        var str = document.getElementById('bitstream-input').value;
        var dir = document.getElementById('direction').value;

        var inp=[],r2=str.split(" "),r3;
        for(a1=0;a1<r2.length;++a1){
                if(r2[a1]==""){continue;}
                r3=parseInt(r2[a1]);
                inp.push(r3);
    
                if((r3>parseInt(final)) || (parseInt(ini)>parseInt(final))){
                                alert("Invalid Input: Final cylinder has to be Greater!");
                                return;
                }
        }
    
        final=parseInt(final);
        ini=parseInt(ini);

        if($('div.left').hasClass('transform') && window.matchMedia("(min-width: 1249px)").matches) {
                $('.left').css("width", "30%");
                $('.left').css("margin", "30px");
                $('#plot-button').css("margin-left", "30px");
                $('#plot-button').css("margin-bottom", "5%");
                $('#animate-button').css("margin-bottom", "5%");
                $('#cmpr-button').css("margin-left", "25%");
                $('.container2').css("top", "800px");
                $('.container3').css("top", "1500px");

                

                setTimeout(function(){
                        document.getElementById("canvas").style.visibility = "visible";
                        myalgorithm(document.getElementById('algorithm').value, inp, ini, final, dir);
                }, 500);

        }
    
        else if(window.matchMedia("(min-width: 992px)").matches) {
                document.getElementById("canvas").style.visibility = "visible";
                myalgorithm(document.getElementById('algorithm').value, inp, ini, final, dir);
                $('.container2').css("top", "1250px");    
        }
    
        else if(window.matchMedia("(min-width: 768px").matches) {
                document.getElementById("canvas").style.visibility = "visible";
                myalgorithm(document.getElementById('algorithm').value, inp, ini, final, dir);
                $('.container2').css("top", "1500px");
        }
    
        else if(window.matchMedia("(min-width: 600px").matches){
                document.getElementById("canvas").style.visibility = "visible";
                myalgorithm(document.getElementById('algorithm').value, inp, ini, final, dir);
                $('.container2').css("top", "1450px");
                
        }
        else {
                document.getElementById("canvas").style.visibility = "visible";
                myalgorithm(document.getElementById('algorithm').value, inp, ini, final, dir);
                $('.container2').css("top", "1350px");
        }
});
    
    
    
    
/**** ANIMATION ****/
    
    
function myalgorithm(alg, inp, ini, final, dir){
    
        if(alg=="fcfs"){
                var op = fcfs(inp, ini, final);
                var target = op[0];
                var seek = op[1];
                animation(target[0].x);
                document.getElementById("am_alg_name").innerHTML = "FCFS";
                document.getElementById("am_alg_seek").innerHTML = "Total Seek Time: " + seek;
        }
    
        if(alg=="sstf"){
                var op = sstf(inp, ini, final);
                var target = op[0];
                var seek = op[1];
                animation(target[0].x);
                document.getElementById("am_alg_name").innerHTML = "SSTF";
                document.getElementById("am_alg_seek").innerHTML = "Total Seek Time: " + seek;
        }
    
        if(alg=="scan"){
                var f = document.forms["myForm"]["final-input"].value;
                
                if(f == ""){
                        alert("Enter the value of Final Cylinder");
                        return false;
                }
    
                var op = scan(inp, ini, final, dir);
                var target = op[0];
                var seek = op[1];
                console.log(seek);
                animation(target[0].x);
                document.getElementById("am_alg_name").innerHTML = "SCAN";
                document.getElementById("am_alg_seek").innerHTML = "Total Seek Time: " + seek;
        }
    
        if(alg=="c-scan"){
                var f = document.forms["myForm"]["final-input"].value;
                
                if(f == ""){
                        alert("Enter the value of Final Cylinder");
                        return false;
                }
                
                var op = cscan(inp, ini, final, dir);
                var target = op[0];
                var seek = op[1];
                var seq = [...target[0].x, ...target[1].x, ...target[2].x];
                animation(seq);
                document.getElementById("am_alg_name").innerHTML = "C-SCAN";
                document.getElementById("am_alg_seek").innerHTML = "Total Seek Time: " + seek;
        }
    
        if(alg=="look"){
                var op = look(inp, ini, final, dir);
                var target = op[0];
                var seek = op[1];
                animation(target[0].x);
                document.getElementById("am_alg_name").innerHTML = "LOOK";
                document.getElementById("am_alg_seek").innerHTML = "Total Seek Time: " + seek;
        }
    
        if(alg=="c-look"){
                var op = clook(inp, ini, final, dir);
                var target = op[0];
                var seek = op[1];
                var seq = [...target[0].x, ...target[1].x, ...target[2].x];
                animation(seq);
                document.getElementById("am_alg_name").innerHTML = "C-LOOK";
                document.getElementById("am_alg_seek").innerHTML = "Total Seek Time: " + seek;
        }
    
}
    
function animation(values) {
        
        var canvas = document.getElementById("canvas");
        var ctx = canvas.getContext("2d");
    
        var cx = 350;
        var cy = 320;
        var PI2 = Math.PI * 2;
        var radius = 0;
        var totRadius = 0;
    
        var circles = [];
    
        const target = values;
        var max = Math.max(...target);
    
        if(max > 30){
                alert("Please Enter values beween 1 to 30 to visualize Animation !");
                return;
        }
                
        addCircle(20, "black");
    
        for(i=0; i<30; i++) {
            addCircle(10, "#A79C9D");
        }
    
        var targetIndex = 1;
        
    
        function addCircle(lineWidth, color) {
          if (radius == 0) {
            radius = lineWidth / 2;
          } else {
            radius += lineWidth;
          }
          totRadius = radius + lineWidth / 2;
          circles.push({
            radius: radius,
            color: color,
            width: lineWidth
          });
        }
    
    
        function drawCircle(circle, color) {
          ctx.beginPath();
          ctx.arc(cx, cy, circle.radius, 0, PI2);
          ctx.closePath();
          ctx.lineWidth = circle.width;
          ctx.strokeStyle = color;
          ctx.stroke();
        }
    
        function canvas_arrow(context, fromx, fromy, tox, toy) {
    
          var headlen = 5; // length of head in pixels
          var dx = tox - fromx;
          var dy = toy - fromy;
          var angle = Math.atan2(dy, dx);
          context.moveTo(fromx, fromy);
          context.lineTo(tox, toy);
          context.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy -   headlen * Math.sin(angle - Math.PI / 6));
          context.moveTo(tox, toy);
          context.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy -   headlen * Math.sin(angle + Math.PI / 6));
        }
    
    
        var fps = 1;
        let request;
        var sik ="Seek-Time: ";
        function animate() {
                   
            
            setTimeout(function() {
            request = requestAnimationFrame(animate);
    
            // Drawing code goes here
            sik = sik + "|" + target[targetIndex].toString() + "-" + target[targetIndex-1].toString() + "|";
            document.getElementById("cl-seek").innerHTML = sik;
            sik = sik + "+";

    
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for(var i=0; i< circles.length; i++)
                {
                    var circle = circles[i];
                    var color = circle.color;
                    drawCircle(circles[i], color);
                }
    
            for (var i = 0; i < circles.length; i++) {
              var circle = circles[i];
              var color = circle.color;
              var p_circle = circles[target[targetIndex-1]];
        
              if (i == target[targetIndex]) {
                color = "white";
                ctx.font = "10px Arial";
                ctx.fillStyle = "black";
                drawCircle(circles[i], color);
        
                ctx.font = "15px Arial";
                ctx.fillStyle = "darkblue";
                ctx.fillText(i, 350 + circle.radius, 310);
                ctx.fillStyle = "black";
                ctx.fillText(target[targetIndex-1], 350 + p_circle.radius, 310);
                ctx.textAlign = "center";
                ctx.beginPath();
                canvas_arrow(ctx, 350+p_circle.radius, 320, 350+circle. radius, 320);
                ctx.strokeStyle = "black";
                ctx.lineWidth = 3;
                ctx.stroke();
              }
            }
    
    
            ctx.beginPath();
            ctx.arc(cx, cy, totRadius, 0, PI2);
            ctx.closePath();
            ctx.strokeStyle = "black";
            ctx.lineWidth = 5;
            ctx.stroke();
            
            targetIndex++;
            if(targetIndex==target.length)
                {
                        cancelAnimationFrame(request);
                        var btn = document.getElementById("animate-button");
                        btn.disabled= false;
                        
                }
          }, 3000);
         
        }
    
        animate();
        
        
    
} // END OF ANIMATION()
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
/***** GRAPH *****/
    
var pre,v1,v2,v3,v4,v5,v6;
    
function fcfs(inp, ini, final){
        var x1=[];
        var y1=[];
        var seek=0;
        x1.push(ini);
        y1.push(0);
        var a1;
        for(a1=1;a1<=inp.length;++a1){
                x1.push(inp[a1-1]);
                y1.push(-1*a1);
                if(a1==1){
                        seek=seek+Math.abs(ini-inp[a1-1]);
                }
                else{
                        seek=seek+Math.abs(inp[a1-2]-inp[a1-1]);
                }
        }
        
        var trace1 = {
                x: x1,
                y: y1,
                type: 'scatter'
        };
    
        var data = [trace1];
        v1=seek;
    
        return [data, seek];
        
}
    
function sstf(inp, ini, final){
        var x1=[];
        var y1=[];
        var seek=0;
        var visited=[];
        var a1,a2;
        for(a1=0;a1<inp.length;++a1){
                visited[a1]=0;
        }
    
        x1.push(ini);
        y1.push(0);
        var hold=ini;
        for(a1=1;a1<=inp.length;++a1){
                var mn=10000;
                var idx;
                for(a2=0;a2<inp.length;++a2){
                        if(visited[a2]==0){
                                if(Math.abs(hold-inp[a2])<mn){
                                        idx=a2;
                                        mn=Math.abs(hold-inp[a2]);
                                }
                        }
                }
                seek=seek+Math.abs(hold-inp[idx]);
                visited[idx]=1;
                hold=inp[idx];
                x1.push(inp[idx]);
                y1.push(-1*a1);
        }
     
        var trace1 = {
                x: x1,
                y: y1,
                type: 'scatter'
        };
    
        var data = [trace1];
        v2=seek;
        
        return [data,seek];
}
    
function scan(inp, ini, final, dir){
        var x1=[];
        var y1=[];
        var seek=0;
        var visited=[];
        var a1,a2;
        console.log(inp);
        for(a1=0;a1<inp.length;++a1){
                visited[a1]=0;
        }
    
        x1.push(ini);
        y1.push(0);
        inp.sort(function(a, b){return a-b});
        if((ini<inp[0])||(ini>inp[inp.length-1])){
                var scan_use = sstf(inp,ini,final);
                var data = scan_use[0];
                var seek = scan_use[1];
                seek=v2;
                v3=seek;
                return [data,seek];
        }
        if(dir=="left"){
                var store,hold=ini;
                for(a1=0;a1<inp.length;++a1){if(inp[a1]<=ini){store=a1;}}
                var count=1;
                for(a1=store;a1>=0;--a1){
                        x1.push(inp[a1]);
                        y1.push(-1*count);
                        ++count;
                        seek=seek+Math.abs(hold-inp[a1]);
                        hold=inp[a1];
                }
                x1.push(0);
                y1.push(-1*count);
                seek=seek+hold;
                hold=0;
                ++count;
                for(a1=store+1;a1<inp.length;++a1){
                        x1.push(inp[a1]);
                        y1.push(-1*count);
                        ++count;
                        seek=seek+Math.abs(hold-inp[a1]);
                        hold=inp[a1];
                }
        }
        else{
                var store,hold=ini;
                for(a1=0;a1<inp.length;++a1){if(inp[a1]>=ini){store=a1;break}}
                var count=1;
                for(a1=store;a1<inp.length;++a1){
                        x1.push(inp[a1]);
                        y1.push(-1*count);
                        ++count;
                        seek=seek+Math.abs(hold-inp[a1]);
                        hold=inp[a1];
                }
                x1.push(final);
                y1.push(-1*count);
                seek=seek+parseInt(final)-hold;
                hold=final;
                ++count;
                for(a1=store-1;a1>=0;--a1){
                        x1.push(inp[a1]);
                        y1.push(-1*count);
                        ++count;
                        seek=seek+Math.abs(hold-inp[a1]);
                        hold=inp[a1];
                }
    
        }
    
        var trace1 = {
                x: x1,
                y: y1,
                type: 'scatter'
        };
    
        var data = [trace1];
        v3=seek;
        console.log(seek);
        console.log(x1);
        return [data, seek];
}
    
function cscan(inp, ini, final, dir){
        var x1=[];
        var y1=[];
        var x2=[];
        var y2=[];
        var x3=[];
        var y3=[];
        var seek=0;
        var visited=[];
        var a1,a2;
        for(a1=0;a1<inp.length;++a1){
                visited[a1]=0;
        }
    
        x1.push(ini);
        y1.push(0);
        inp.sort(function(a, b){return a-b});
        if((ini<inp[0])||(ini>inp[inp.length-1])){
                var cscan_use = sstf(inp,ini,final);
                var data = cscan_use[0];
                var seek = cscan_use[1];
                seek=v2;
                v4=seek;
                return [data,seek];
        }
        if(dir=="left"){
                var store,hold=ini;
                for(a1=0;a1<inp.length;++a1){if(inp[a1]<=ini){store=a1;}}
                var count=1;
                for(a1=store;a1>=0;--a1){
                        x1.push(inp[a1]);
                        y1.push(-1*count);
                        ++count;
                        seek=seek+Math.abs(hold-inp[a1]);
                        hold=inp[a1];
                }
                x1.push(0);
                y1.push(-1*count);
                seek=seek+hold;
                hold=final;
                x2.push(0);
                y2.push(-1*count);
                x2.push(final);
                y2.push(-1*count);
    
                x3.push(final);
                y3.push(-1*count);
                ++count;
                for(a1=inp.length-1;a1>store;--a1){
                        x3.push(inp[a1]);
                        y3.push(-1*count);
                        ++count;
                        seek=seek+Math.abs(hold-inp[a1]);
                        hold=inp[a1];
                }
        }
        else{
                var store,hold=ini;
                for(a1=0;a1<inp.length;++a1){if(inp[a1]>=ini){store=a1;break;}}
                var count=1;
                for(a1=store;a1<inp.length;++a1){
                        x1.push(inp[a1]);
                        y1.push(-1*count);
                        ++count;
                        seek=seek+Math.abs(hold-inp[a1]);
                        hold=inp[a1];
                }
                x1.push(final);
                y1.push(-1*count);
                seek=seek+final-hold;
                hold=0;
                x2.push(final);
                y2.push(-1*count);
                x2.push(0);
                y2.push(-1*count);
    
                x3.push(0);
                y3.push(-1*count);
                ++count;
                for(a1=0;a1<store;++a1){
                        x3.push(inp[a1]);
                        y3.push(-1*count);
                        ++count;
                        seek=seek+Math.abs(hold-inp[a1]);
                        hold=inp[a1];
                }
    
        }
        var trace1 = {
                x: x1,
                y: y1,
                type: 'scatter',
                name: ''
        };
        var trace2 = {
                x: x2,
                y: y2,
                mode: 'lines',
                name: '',
                line: {
                        dash: 'dashdot',
                        width: 4
                }
        };
        var trace3 = {
                x: x3,
                y: y3,
                type: 'scatter',
                name: ''
        };

        v4=seek;
    
        var data = [trace1,trace2,trace3];
        var max1 = Math.max(...trace1.x);
        var max2 = Math.max(...trace2.x);
        var max3 = Math.max(...trace3.x);

        var min1 = Math.min(...trace1.x);
        var min2 = Math.min(...trace2.x);
        var min3 = Math.min(...trace3.x);

        seek = max1 + max2 + max3 - min1 - min2 - min3;


        

       
        
        return [data, seek];
}
    
function look(inp, ini, final, dir){
        var x1=[];
        var y1=[];
        var seek=0;
        var visited=[];
        var a1,a2;
        for(a1=0;a1<inp.length;++a1){
                visited[a1]=0;
        }
    
        x1.push(ini);
        y1.push(0);
        inp.sort(function(a, b){return a-b});
        if((ini<inp[0])||(ini>inp[inp.length-1])){
                var look_use = sstf(inp,ini,final);
                var data = look_use[0];
                var seek = look_use[1];
                seek=v2;
                v5=seek;
                return [data,seek];
        }
        if(dir=="left"){
                var store,hold=ini;
                for(a1=0;a1<inp.length;++a1){if(inp[a1]<=ini){store=a1;}}
                var count=1;
                for(a1=store;a1>=0;--a1){
                        x1.push(inp[a1]);
                        y1.push(-1*count);
                        ++count;
                        seek=seek+Math.abs(hold-inp[a1]);
                        hold=inp[a1];
                }
    
                for(a1=store+1;a1<inp.length;++a1){
                        x1.push(inp[a1]);
                        y1.push(-1*count);
                        ++count;
                        seek=seek+Math.abs(hold-inp[a1]);
                        hold=inp[a1];
                }
        }
        else{
                var store,hold=ini;
                for(a1=0;a1<inp.length;++a1){if(inp[a1]>=ini){store=a1;break}}
                var count=1;
                for(a1=store;a1<inp.length;++a1){
                        x1.push(inp[a1]);
                        y1.push(-1*count);
                        ++count;
                        seek=seek+Math.abs(hold-inp[a1]);
                        hold=inp[a1];
                }
    
                for(a1=store-1;a1>=0;--a1){
                        x1.push(inp[a1]);
                        y1.push(-1*count);
                        ++count;
                        seek=seek+Math.abs(hold-inp[a1]);
                        hold=inp[a1];
                }
    
        }
    
        var trace1 = {
                x: x1,
                y: y1,
                type: 'scatter'
        };
    
        var data = [trace1];
        v5=seek;
       
        return [data, seek];
}
    
function clook(inp, ini, final, dir){
        var x1=[];
        var y1=[];
        var x2=[];
        var y2=[];
        var x3=[];
        var y3=[];
        var seek=0;
        var visited=[];
        var a1,a2;
        for(a1=0;a1<inp.length;++a1){
                visited[a1]=0;
        }
    
        x1.push(ini);
        y1.push(0);
        inp.sort(function(a, b){return a-b});
        if((ini<inp[0])||(ini>inp[inp.length-1])){
                var clook_use = sstf(inp,ini,final);
                var data = clook_use[0];
                var seek = clook_use[1];
                seek=v2;
                v6=seek;
                return [data, seek];
        }
        if(dir=="left"){
                var store,hold=ini;
                for(a1=0;a1<inp.length;++a1){if(inp[a1]<=ini){store=a1;}}
                var count=1;
                for(a1=store;a1>=0;--a1){
                        x1.push(inp[a1]);
                        y1.push(-1*count);
                        ++count;
                        seek=seek+Math.abs(hold-inp[a1]);
                        hold=inp[a1];
                }
    
                x2.push(hold);
                y2.push(-1*(count-1));
                x2.push(inp[inp.length-1]);
                y2.push(-1*(count-1));
                x3.push(inp[inp.length-1]);
                y3.push(-1*(count-1));
    
                hold=inp[inp.length-1];
                for(a1=inp.length-2;a1>store;--a1){
                        x3.push(inp[a1]);
                        y3.push(-1*count);
                        ++count;
                        seek=seek+Math.abs(hold-inp[a1]);
                        hold=inp[a1];
                }
        }
        else{
                var store,hold=ini;
                for(a1=0;a1<inp.length;++a1){if(inp[a1]>=ini){store=a1;break;}}
                var count=1;
                for(a1=store;a1<inp.length;++a1){
                        x1.push(inp[a1]);
                        y1.push(-1*count);
                        ++count;
                        seek=seek+Math.abs(hold-inp[a1]);
                        hold=inp[a1];
                }
    
                x2.push(hold);
                y2.push(-1*(count-1));
                x2.push(inp[0]);
                y2.push(-1*(count-1));
    
                x3.push(inp[0]);
                y3.push(-1*(count-1));
    
                hold=inp[0];
                for(a1=1;a1<store;++a1){
                        x3.push(inp[a1]);
                        y3.push(-1*count);
                        ++count;
                        seek=seek+Math.abs(hold-inp[a1]);
                        hold=inp[a1];
                }
    
        }
       
        var trace1 = {
                x: x1,
                y: y1,
                type: 'scatter',
                name: ''
        };
        var trace2 = {
                x: x2,
                y: y2,
                mode: 'lines',
                name: '',
                line: {
                        dash: 'dashdot',
                        width: 4
                }
        };
        var trace3 = {
                x: x3,
                y: y3,
                type: 'scatter',
                name: ''
        };
    
        var data = [trace1,trace2,trace3];
        v6=seek;

        var data = [trace1,trace2,trace3];
        var max1 = Math.max(...trace1.x);
        var max2 = Math.max(...trace2.x);
        var max3 = Math.max(...trace3.x);

        var min1 = Math.min(...trace1.x);
        var min2 = Math.min(...trace2.x);
        var min3 = Math.min(...trace3.x);

        seek = max1 + max2 + max3 - min1 - min2 - min3;
       
        return [data, seek];
}
    
function getBitStreamAndPlot(event, r1, ini, final, alg, side){
        var b = document.forms["myForm"]["bitstream-input"].value;
        var i = document.forms["myForm"]["initial-input"].value;
        if(b == ""){
                alert("Enter the Sequence of Request queue!");
                return false;
        }
        if (b!= "" && i == "") {
                alert("Enter the value of Initial Cylinder!");
                return false;
        }
    
        var inp=[],r2=r1.split(" "),r3;
        for(a1=0;a1<r2.length;++a1){
                if(r2[a1]==""){continue;}
                r3=parseInt(r2[a1]);
                inp.push(r3);
    
                if((r3>parseInt(final)) || (parseInt(ini)>parseInt(final))){
                                alert("Invalid Input: Final cylinder has to be Greater!");
                                return;
                }
        }
    
        final=parseInt(final);
        ini=parseInt(ini);
        dir=side;
        pre=1;
        
        if(alg=="fcfs"){
                var alg_use = fcfs(inp, ini, final);
                var plt_alg = "FCFS";
        }
        if(alg=="sstf"){
                var alg_use = sstf(inp, ini, final);
                var plt_alg = "SSTF";
    
        }
        if(alg=="scan"){
                var f = document.forms["myForm"]["final-input"].value;
                
                if(f == ""){
                        alert("Enter the value of Final Cylinder");
                        return false;
                }
    
                var alg_use = scan(inp, ini, final, dir);
                var plt_alg = "SCAN";
    
        }
        if(alg=="c-scan"){
                var alg_use = cscan(inp, ini, final, dir);
                var plt_alg = "C-SCAN";
    
                var f = document.forms["myForm"]["final-input"].value;
                
                if(f == ""){
                        alert("Enter the value of Final Cylinder");
                        return false;
                }
               
        }
        if(alg=="look"){
                var alg_use = look(inp, ini, final, dir);
                var plt_alg = "LOOK";
        }
        if(alg=="c-look"){
                var alg_use = clook(inp, ini, final, dir);
                var plt_alg = "C-LOOK";
        }
    
        var data = alg_use[0];
        var seek = alg_use[1];
    
        var layout = {
                xaxis: {
                        autorange: true,
                        showgrid: true,
                        zeroline: false,
                        showline: true,
                        autotick: true,
                        ticks: '',
                        showticklabels: true,
                        title: 'Cylinder Number'
                },
                yaxis: {
                        autorange: true,
                        showgrid: false,
                        zeroline: false,
                        showline: false,
                        autotick: true,
                        ticks: '',
                        showticklabels: false,
                }
        };
        
        if(pre){
                Plotly.newPlot('graph_area', data, layout);
                var val = data[0].x;
                var tot_seek = "Seek-Time: ";
                for(var i=1; i<val.length; i++){
                        tot_seek = tot_seek + "|" + val[i].toString() + "-" + val[i-1].toString()  + "|" ;
                        if(i<val.length-1)
                                tot_seek = tot_seek + "+";
                        
                }
                document.getElementById("plt_alg_name").innerHTML = plt_alg;
                document.getElementById("cal-seek").innerHTML = tot_seek + " = " + seek;

                document.getElementById("graph_area").style.visibility = "visible";
        }
                        
}


function cmprPlot(event, r1, ini, final, alg, side){

        document.getElementById("cmpr-head").innerHTML="Comparison-Chart";

        var b = document.forms["myForm"]["bitstream-input"].value;
        var i = document.forms["myForm"]["initial-input"].value;
        if(b == ""){
                alert("Enter the Sequence of Request queue!");
                return false;
        }
        if (b!= "" && i == "") {
                alert("Enter the value of Initial Cylinder!");
                return false;
        }
    
        var ini = parseInt(document.getElementById('initial-input').value);
        var final =  parseInt(document.getElementById('final-input').value);
        var str = document.getElementById('bitstream-input').value;
        var dir = document.getElementById('direction').value;

        var inp=[],r2=str.split(" "),r3;
        for(a1=0;a1<r2.length;++a1){
                if(r2[a1]==""){continue;}
                r3=parseInt(r2[a1]);
                inp.push(r3);
    
                if((r3>parseInt(final)) || (parseInt(ini)>parseInt(final))){
                                alert("Invalid Input: Final cylinder has to be Greater!");
                                return;
                }
        }
    
        final=parseInt(final);
        ini=parseInt(ini);

        var op1 = fcfs(inp, ini, final);
        var seek1 = op1[1];

        var op2 = sstf(inp, ini, final);
        var seek2 = op2[1];

        var op3 = scan(inp, ini, final, dir);
        var seek3 = op3[1];

        var op4 = cscan(inp, ini, final, dir);
        var seek4 = op4[1];

        var op5 = look(inp, ini, final, dir);
        var seek5 = op5[1];

        var op6 = clook(inp, ini, final, dir);
        var seek6 = op6[1];

        var data = [
                {
                  x: ['FCFS', 'SSTF', 'SCAN', 'C-SCAN', 'LOOK', 'C-LOOK'],
                  y: [seek1, seek2, seek3, seek4, seek5, seek6],
                  type: 'bar'
                }
              ];
              
              Plotly.newPlot('cmpr_area', data);

              document.getElementById("cmpr_area").style.visibility = "visible";
}



    
    
    
    
              
              
              