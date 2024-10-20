// app/api/recyclecenters/route.js
import { NextResponse } from 'next/server';

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const latitude = searchParams.get('latitude');
  const longitude = searchParams.get('longitude');

  if (!latitude || !longitude) {
    return NextResponse.json({ error: 'Missing latitude or longitude' }, { status: 400 });
  }

  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=5000&keyword=recycling%20center&key=${API_KEY}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      return NextResponse.json({ error: 'Could not fetch recycle centers.' }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data.results);

  } catch (error) {
    console.error('Error fetching recycle centers:', error);
    return NextResponse.json({ error: 'An error occurred while fetching data.' }, { status: 500 });
  }
  
}
