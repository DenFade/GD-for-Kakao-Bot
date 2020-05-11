module.exports = {
    encode: function(str){
        return java.util.Base64.getUrlEncoder().encodeToString(new java.lang.String(str).getBytes());
    },
    decode: function(str){
        let result = null;
        let buf = new java.lang.StringBuilder(str);
        while(result == null && buf.length() > 0){
            try{
                result = java.util.Base64.getUrlDecoder().decode(buf.toString());
            } catch(e){
                buf.deleteCharAt(buf.length() - 1);
            }
        }
        return result == null ? "" : new java.lang.String(result);
    }
}