import { NextResponse, NextRequest } from "next/server";
import { pinata } from "@/utils/config";

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };


export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file: File | null = data.get("file") as unknown as File;
    const uploadData = await pinata.upload.file(file);
    const url = await pinata.gateways.convert(uploadData.IpfsHash);
    return NextResponse.json(url, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

function asciiToHex(asciiString) {
  return asciiString.split('').map(char => {
      // Convert each character to its hex value
      return char.charCodeAt(0).toString(16).padStart(2, '0');
  }).join('');
}

function cidToTwoByte32(cid) {
  const length = cid.length;
  let part1 = "";
  let part2 = "";
  part1

}

export async function GET(request: NextRequest) {
  // Example usage
  const cid = "bafkreigckwfpnw74hpevxowhwyd5w2rqhudjxjw4hbd5mafhc3ahkfhyru";
  console.log(asciiToHex(cid));
  return NextResponse.json("yoyo", { status: 200 });
}
