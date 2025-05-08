import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function listInvoices() {
 	 const data = await sql`
  SELECT invoices.amount, customers.name
   FROM invoices
   JOIN customers ON invoices.customer_id = customers.id
   WHERE invoices.amount = 666;
  `;

 return data;
 }


 export async function GET() {
  const invoices = await listInvoices();
  console.log(invoices); // still logs for debugging

  // Minimal response so Next.js doesn't crash
  return new Response('Query executed. Check the terminal for results.', { status: 200 });
}
