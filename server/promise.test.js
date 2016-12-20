var proms = new Promise(function(resolve,reject){
  resolve("hi");
});
// for(var i=0; i<5; i++){
//   (function(x){
//     proms = proms.then(function(res){
//       console.log(res);
//       return new Promise(function(resolve,reject){
//         setTimeout(function(){
//           if((x+1)%5 !== 0){
//             resolve(x+ " resolved");
//           }else{
//             reject(x+ " rejected");
//           }
//         }, (x+1) * 500);
//       });
//     });
//     // proms = proms.then(function(res){
//     //   console.log(res);
//     // });
//   })(i);
// }
// proms = proms.catch(function(err){
//   console.log("errrr" + err);
//   console.log(proms);
// });
// console.log(proms);
proms = proms.then(function(res){
  console.log(res);
});
setTimeout(function(){
  console.log(proms);
},2000);
// proms = proms.catch(function(res){
//   console.log(res);
// })
