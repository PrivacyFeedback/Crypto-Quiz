import GetContract from "./getContract";

export async function GET(request: Request) {
    const contract = await GetContract();
    const balance = await contract.retrieve();
    console.log("retrieve", balance.toString());

    return Response.json({balance: balance.toString()});
}

export async function POST(request: Request) {
    const requestBody = await request.json();
    console.log(requestBody);

    const contract = await GetContract();
    const value = parseInt(requestBody.value);
    if (typeof value !== 'number') {
        console.log("NaN")
        return Response.json({error: "Value must be a number"}, {status: 400});
    }
    
    await contract.store(requestBody.value);
    console.log("Stored: ", requestBody.value);

    return Response.json({message: "POST request received"});
}