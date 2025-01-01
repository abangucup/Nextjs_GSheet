import {
  GoogleSpreadsheet
} from 'google-spreadsheet';
import {
  JWT
} from 'google-auth-library';
import key from '~/app/key/gs-key.json';

export async function POST(request) {
  try {
    // Membaca data dari body request
    const body = await request.json();

    // Validasi input
    if (!body.nama || !body.alamat) {
      return new Response(
        JSON.stringify({
          message: 'Nama dan Alamat harus diisi'
        }), {
          status: 400,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
    }

    // Membuat instance JWT untuk autentikasi
    const auth = new JWT({
      email: key.client_email,
      key: key.private_key.replace(/\\n/g, '\n'), // Handle newline di private_key
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    // Membuat instance Google Spreadsheet dengan autentikasi
    const doc = new GoogleSpreadsheet(process.env.KEY_ID_SPREADSHEET, auth);

    // Memuat informasi spreadsheet
    await doc.loadInfo();
    console.log('Spreadsheet Title:', doc.title);
    console.log('Body :', body);
    // Akses sheet pertama
    const sheet = doc.sheetsByIndex[0];
    console.log('Sheet Name:', sheet);

    await sheet.addRows([body]);

    // Respons sukses
    return new Response(
      JSON.stringify({
        message: 'Data berhasil ditambahkan'
      }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({
        message: 'Terjadi kesalahan',
        error: error.message
      }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }
}