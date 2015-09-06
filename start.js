var InputTest = React.createClass({
    getInitialState:function(){
        return {lis:[]}
    },
    updateLi:function(){
        //updateData
        this.setState({
            lis:this.state.lis.concat(React.findDOMNode(this.refs.inputli).value.trim())
        });
    },
    render:function(){
        var lisTest = React.createElement(
            LisTest,
            {data:this.state.lis}
        );
        var inputs = React.createElement('input',{type:'text',ref:'inputli'});
        var button = React.createElement('button',{onClick:this.updateLi},'add');
        return(
               React.createElement("div",null,
                    lisTest,inputs,button
               )
        );
    }
})
var LisTest = React.createClass({
    render:function(){
        var nodes = this.props.data.map(function(detail){
            return(
                <li>{detail}</li>
            );
        });
        return(
           <ul>
                {nodes}
           </ul>
        )
    }
})

var OutDiv = React.createClass({
    render:function(){
        return(
            <div className="outer">
               <InputTest />
            </div>
        )
    }
})
var CountDownMixin ={
    doCount:function(){
        setInterval.apply(null,arguments);
    }
}

var Clock = React.createClass({
    mixins:[CountDownMixin],
    getInitialState:function(){
        return {sec:0}
    },
    componentDidMount:function(){
        this.doCount(this.titTok,1000);
    },
    titTok:function(){
        //var aCallback = this.testConsole('init');
        this.setState(function(state,aCallback){ //setState as callback
              return {sec:state.sec+1};
        });
        //this.testConsole('force');
    },
    testConsole:function(param){
        var state = this.state.sec;
      if(param == 'init'){
        console.log(' innerCallback '+state);
      }else{
         console.log(' outerCallback '+state);
      }
    },
    statics:{ //class staticMethod
        customMethod:function(arg){
            console.log(' the currentSec '+arg);
        }
    },
    render:function(){
        return(
            <span className="clockClass" >
                you've runed the program {this.state.sec}
            </span>
        )
    }
})

var outdiv = React.createElement(OutDiv,{className:'outDiv'});
React.render(
    outdiv,
    document.querySelector('#content')
);
React.render(
    <Clock />,
    document.querySelector('#clockDiv')
);
//Clock.customMethod(this.props.sec);
