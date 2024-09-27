import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const data = await request.json();

    // Log or process the data (e.g., save to a database)
    console.log('Received data:', data);

    return NextResponse.json(
      { message: 'Data received successfully', receivedData: data },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing data:', error);
    return NextResponse.json(
      { message: 'Error processing data', error: error.message },
      { status: 500 }
    );
  }
}
