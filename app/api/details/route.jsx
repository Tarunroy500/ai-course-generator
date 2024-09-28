import { NextResponse } from 'next/server';
import { getResponseFromAPI } from '@/models/main_course_generator/loader';

export async function POST(request) {
  try {
    const data = await request.json();

    
    // Log or process the data (e.g., save to a database)
    console.log('Received data:', data);

    let response = getResponseFromAPI(data)
    console.log(`>>> Json Formatted Response from API : \n\n ${response}`)


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


