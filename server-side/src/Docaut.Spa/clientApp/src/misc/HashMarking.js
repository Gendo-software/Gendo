import CodeMirror from 'codemirror';
import 'codemirror/addon/runmode/runmode';
import './hashMarking.css';

export const MARKING_NAME = "hash";

export function InitHashMarking(codeMirrorMode) {

  CodeMirror.defineMode(MARKING_NAME, function (config, parserConfig) {
    var mustacheOverlay = {
      token: function (stream, state) {
        var ch;
        // pattern for ##test## (without ' ' inside)
        if (stream.match("##")) {
          while ((ch = stream.next()) != null && ch != " ") {            
            if (ch == "#" && stream.next() == "#") {
              stream.eat("#");
              return MARKING_NAME;
            }
          }
        }
        while (stream.next() != null && !stream.match("##", false)) { }
        return null;
      }
    };
    //var tempMode = CodeMirror.getMode(config, parserConfig.backdrop || "gfm");    
    //var tempMode = CodeMirror.getMode(config, "gfm");   
    var tempMode = codeMirrorMode;     
    return CodeMirror.overlayMode(tempMode, mustacheOverlay);
  });
}      