//check production
export const checkEnvReturnUrl = url => {
  if(process.env.NODE_ENV !== 'production'){
    return `http://127.0.0.1:8000${url}`;
  }
  return url;
}
