// run code below to build.
// node-gyp configure && node-gyp build
// addon.cc
#include <node.h>
#include <string>
#include "node_squwbs.h"
namespace demo {

using v8::Exception;
using v8::FunctionCallbackInfo;
using v8::Isolate;
using v8::Local;
using v8::NewStringType;
using v8::Number;
using v8::Object;
using v8::String;
using v8::Value;
using v8::Array;
using v8::ArrayBuffer;
using v8::Context;

// This is the implementation of the "add" method
// Input arguments are passed using the
// const FunctionCallbackInfo<Value>& args struct
ThreeBandEQ three;
void Process(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();

  // Check the number of arguments passed.
  if (args.Length() < 2) {
    // Throw an Error that is passed back to JavaScript
    isolate->ThrowException(Exception::TypeError(
        String::NewFromUtf8(isolate,
                            "Wrong number of arguments",
                            NewStringType::kNormal).ToLocalChecked()));
    return;
  }

  // Check the argument types
  if (!args[0]->IsNumber() || !args[1]->IsNumber()) {
    isolate->ThrowException(Exception::TypeError(
        String::NewFromUtf8(isolate,
                            "Wrong arguments",
                            NewStringType::kNormal).ToLocalChecked()));
    return;
  }

  // Perform the operation
  //double value =args[0].As<Number>()->Value() + args[1].As<Number>()->Value();
  //Local<Array> output = Array::New(isolate);
  Local<Context> context = isolate->GetCurrentContext();
  Local<Object> output = Object::New(isolate);
  
  float left = (args[0].As<Number>()->Value());
  float right = (args[1].As<Number>()->Value());
  

  if(isnan(left)==1){
    left=0;
  }
  if(isnan(right)==1){
    right=0;
  }
  float* threeOut = three.match(left,right);
  Local<Number> leftOut = Number::New(isolate,threeOut[0]);
  Local<Number> rightOut = Number::New(isolate,threeOut[1]);
  //output->Set(0,Number::New(isolate,threeOut[0]));
  //output->Set(1,Number::New(isolate,threeOut[1]));
  // output->Set(context,String::NewFromUtf8(isolate,"left",NewStringType::kNormal).ToLocalChecked(),Number::New(isolate,threeOut[0]));
  // output->Set(context,String::NewFromUtf8(isolate,"right",NewStringType::kNormal).ToLocalChecked(),Number::New(isolate,threeOut[1]));
  //output->Set(context,String::NewFromUtf8(isolate,"left",NewStringType::kNormal).ToLocalChecked(),String::NewFromUtf8(isolate,threeOut[0],NewStringType::kNormal).ToLocalChecked());
  //output->Set(context,String::NewFromUtf8(isolate,"right",NewStringType::kNormal).ToLocalChecked(),String::NewFromUtf8(isolate,threeOut[1],NewStringType::kNormal).ToLocalChecked());
  output->Set(context,String::NewFromUtf8(isolate,"left",NewStringType::kNormal).ToLocalChecked(),leftOut);
  output->Set(context,String::NewFromUtf8(isolate,"right",NewStringType::kNormal).ToLocalChecked(),rightOut);
  args.GetReturnValue().Set(output);
}

void SetSR(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();

  // Check the number of arguments passed.
  if (args.Length() < 1) {
    // Throw an Error that is passed back to JavaScript
    isolate->ThrowException(Exception::TypeError(
        String::NewFromUtf8(isolate,
                            "Wrong number of arguments",
                            NewStringType::kNormal).ToLocalChecked()));
    return;
  }

  // Check the argument types
  if (!args[0]->IsNumber()) {
    isolate->ThrowException(Exception::TypeError(
        String::NewFromUtf8(isolate,
                            "Wrong arguments",
                            NewStringType::kNormal).ToLocalChecked()));
    return;
  }

  // Perform the operation
  //double value =args[0].As<Number>()->Value() + args[1].As<Number>()->Value();
  float SR = (args[0].As<Number>()->Value());
  three.setSampleRate(SR);
  //Local<String> output = String::NewFromUtf8(isolate,'set',NewStringType::kNormal).ToLocalChecked();
  
  

  //args.GetReturnValue().Set(output);
}
void Reset(const FunctionCallbackInfo<Value>& args) {
  //Isolate* isolate = args.GetIsolate();



  // Perform the operation
  //double value =args[0].As<Number>()->Value() + args[1].As<Number>()->Value();
  three.reset();
  three.setGoals(0.075984, 0.146870, 0.088813, 0.058443, 0.078016, 0.041593, 0.062500, 0.175659, 0.118946, 0.063000, 0.125000, 0.063000);
  //three.setSampleRate(SR);
  //Local<String> output = String::NewFromUtf8(isolate,'set',NewStringType::kNormal).ToLocalChecked();
  
  

  //args.GetReturnValue().Set(output);
}



void Init(Local<Object> exports) {
  NODE_SET_METHOD(exports, "process", Process);
 // NODE_SET_METHOD(exports, "setSR", SetSR);
 // NODE_SET_METHOD(exports, "reset", Reset);
}

NODE_MODULE(NODE_GYP_MODULE_NAME, Init)

}  // namespace demo
