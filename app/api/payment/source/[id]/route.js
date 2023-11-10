export const GET = async(request, {params}) =>{
    const optionsIntent = {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Basic ${Buffer.from(process.env.PAYMONGO_SECRET).toString(
            "base64"
          )}`, 
        }
      }
    try{
        const response = await fetch(`https://api.paymongo.com/v1/sources/${params.id}`, optionsIntent);
        const data = await response.json();
        console.log("row Source Data:", data)
        return new Response(JSON.stringify(data), { status: 200 });
      }catch(error){
        console.error(error);
      }    

}