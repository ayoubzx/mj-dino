// Import required Deno modules
import { Application, Router } from "oak/mod.ts";
import { MongoClient } from "mongo/mod.ts";
import axiod from "axiod";


const app = new Application();
const router = new Router();

// MongoDB connection
const client = new MongoClient();
await client.connect("mongodb+srv://Caera:caera2006@caera.ehmr8v6.mongodb.net/?retryWrites=true&w=majority");
const db = client.database("test");
const Item = db.collection("madjs");

// Schema interface
interface ExampleSchema {
  items: Array<{
    two: string;
    three: string;
    five: string;
  }>;
}

async function getArrayOnly(documentId: string) {
  try {
    const document = await Item.findOne({ _id: documentId });
    if (document) {
      console.log(document.items);
    } else {
      console.log('Document not found');
    }
  } catch (error) {
    console.error('Error fetching array:', error);
  }
}

async function addItemToArray(arrayId: string, newItem: any) {
  try {
    const updatedDocument = await Item.updateOne(
      { _id: arrayId },
      { $push: { items: newItem } }
    );

    if (updatedDocument) {
      console.log("Updated");
    } else {
      console.log('Document not found');
    }
  } catch (error) {
    console.error('Error adding item to array:', error);
  }
}

async function MakeMail() {
  const options = {
    method: 'POST',
    url: 'https://api.internal.temp-mail.io/api/v3/email/new',
    headers: {
      'accept': 'application/json, text/plain, */*',
      'accept-language': 'en-US,en;q=0.9',
      'application-name': 'web',
      'application-version': '2.4.2',
      'content-type': 'application/json;charset=UTF-8',
      'priority': 'u=1, i',
      'sec-ch-ua': '"Brave";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"Windows"',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-site',
      'sec-gpc': '1',
      'Referer': 'https://temp-mail.io/',
      'Referrer-Policy': 'strict-origin-when-cross-origin'
    },
    data: {
      min_name_length: 10,
      max_name_length: 10
    }
  };

  try {
    const response = await axiod.request(options);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

async function mekereq(em: string) {
  let st;
  try {
    const response = await axiod.post(
      'https://auth.zhishuyun.com/api/v1/email-code',
      {
        'template': '115309',
        'receiver': em
      },
      {
        headers: {
          'Accept-Language': 'en-US,en;q=0.9,ar-US;q=0.8,ar;q=0.7',
          'Connection': 'keep-alive',
          'Cookie': 'INVITER_ID=undefined',
          'Origin': 'https://auth.zhishuyun.com',
          'Referer': 'https://auth.zhishuyun.com/auth/register?inviter_id=undefined',
          'Sec-Fetch-Dest': 'empty',
          'Sec-Fetch-Mode': 'cors',
          'Sec-Fetch-Site': 'same-origin',
          'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
          'sec-ch-ua': '"Not-A.Brand";v="99", "Chromium";v="124"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Linux"'
        }
      }
    );
    st = "s";
  } catch (error) {
    st = "n";
    console.log(error);
  }
  return st;
}

async function GetMails(Mail: string) {
  const options = {
    method: 'GET',
    url: `https://api.internal.temp-mail.io/api/v3/email/${Mail}/messages`,
    headers: {
      'accept': 'application/json, text/plain, */*',
      'accept-language': 'en-US,en;q=0.9',
      'application-name': 'web',
      'application-version': '2.4.2',
      'priority': 'u=1, i',
      'sec-ch-ua': '"Brave";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"Windows"',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-site',
      'sec-gpc': '1',
      'Referer': 'https://temp-mail.io/',
      'Referrer-Policy': 'strict-origin-when-cross-origin'
    }
  };

  try {
    const response = await axiod.request(options);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

function GenPas() {
  const uc = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lc = 'abcdefghijklmnopqrstuvwxyz';
  const nm = '0123456789';
  const sp = '@';
  let pw = '';
  pw += uc[Math.floor(Math.random() * uc.length)];
  const ac = lc + nm + sp;
  for (let i = 0; i < 9; i++) {
    pw += ac[Math.floor(Math.random() * ac.length)];
  }
  pw += sp;
  return pw;
}

async function mekeac(verf: string, em: string, pas: string) {
  try {
    const response = await axiod.post(
      'https://auth.zhishuyun.com/api/v1/users',
      {
        'email': em,
        'email_code': verf,
        'password': pas,
        'inviter_id': 'undefined'
      },
      {
        headers: {
          'Accept-Language': 'en-US,en;q=0.9,ar-US;q=0.8,ar;q=0.7',
          'Connection': 'keep-alive',
          'Cookie': 'INVITER_ID=undefined',
          'Origin': 'https://auth.zhishuyun.com',
          'Referer': 'https://auth.zhishuyun.com/auth/register?inviter_id=undefined',
          'Sec-Fetch-Dest': 'empty',
          'Sec-Fetch-Mode': 'cors',
          'Sec-Fetch-Site': 'same-origin',
          'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36',
          'sec-ch-ua': '"Not-A.Brand";v="99", "Chromium";v="124"',
          'sec-ch-ua-mobile': '?1',
          'sec-ch-ua-platform': '"Android"'
        }
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return "err";
  }
}

async function mekeacc(em: string, pas: string) {
  try {
    const response = await axiod.post(
      'https://auth.zhishuyun.com/api/v1/login/',
      {
        'email': em,
        'password': pas
      },
      {
        headers: {
          'Accept-Language': 'en-US,en;q=0.9,ar-US;q=0.8,ar;q=0.7',
          'Connection': 'keep-alive',
          'Cookie': 'INVITER_ID=undefined',
          'Origin': 'https://auth.zhishuyun.com',
          'Referer': 'https://auth.zhishuyun.com/auth/login?inviter_id=undefined',
          'Sec-Fetch-Dest': 'empty',
          'Sec-Fetch-Mode': 'cors',
          'Sec-Fetch-Site': 'same-origin',
          'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36',
          'sec-ch-ua': '"Not-A.Brand";v="99", "Chromium";v="124"',
          'sec-ch-ua-mobile': '?1',
          'sec-ch-ua-platform': '"Android"'
        }
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return "err";
  }
}

async function GenAccToken() {
  let verf;
  let M: any = {};
  try {
    M = await MakeMail();
    let ss = await mekereq(M.email);
    if (ss == "n") return "err";
    let Y = await GetMails(M.email);
    while (!Y[0]) {
      Y = await GetMails(M.email);
    }
    let text = Y[0].body_text;
    const match = text.match(/\b\d{6}\b/);
    verf = match ? match[0] : null;
  } catch (e) {
    return "err";
  }
  let passo = GenPas();
  await mekeac(verf, M.email, passo);
  let knokitout = await mekeacc(M.email, passo);
  let realtoken = knokitout.access_token;
  return realtoken;
}

async function GEN(p: string, tok: string) {
  let ni, st, id, task;
  try {
    const f = await axiod({
      method: 'POST',
      url: 'https://api.zhishuyun.com/midjourney/imagine/turbo?token=' + tok,
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
      },
      data: {
        action: 'generate',
        prompt: p,
      },
    });

    task = null;
    ni = f.data.raw_image_url;
    id = f.data.image_id;
    st = "s";
  } catch (err: any) {
    ni = null;
    st = "e";
    task = err?.response?.data;
  }
  return {
    id,
    ni: ni,
    task: task,
    st: st
  };
}

async function getIMG(NUM: string, ID: string, tok: string) {
  let ni, st, id;
  try {
    const f = await axiod({
      method: 'POST',
      url: 'https://api.zhishuyun.com/midjourney/imagine/turbo?token=' + tok,
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
      },
      data: {
        action: NUM,
        image_id: ID
      },
    });
    ni = f.data?.raw_image_url;
    id = f.data?.image_id;
    st = "s";
  } catch (err) {
    ni = null;
    st = "e";
  }
  return {
    ni: ni,
    st: st,
    id: id
  };
}

async function GetTokenMj() {
  async function Twogift(auth: string) {
    try {
      const response = await axiod.post(
        'https://data.zhishuyun.com/api/v1/applications/',
        {
          'type': 'Api',
          'api_id': '62ec82bd-7de3-427f-b71a-ab3551ac7677'
        },
        {
          headers: {
            'Accept': 'application/json',
            'Accept-Language': 'en-US,en;q=0.9,ar-US;q=0.8,ar;q=0.7',
            'Authorization': 'Bearer ' + auth,
            'Connection': 'keep-alive',
            'Content-Type': 'application/json',
            'Cookie': 'INVITER_ID=undefined',
            'Origin': 'https://data.zhishuyun.com',
            'Referer': 'https://data.zhishuyun.com/services/d87e5e99-b797-4ade-9e73-b896896b0461',
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'same-origin',
            'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
            'sec-ch-ua': '"Not-A.Brand";v="99", "Chromium";v="124"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Linux"'
          }
        }
      );

      const response1 = await axiod.get('https://data.zhishuyun.com/api/v1/applications/', {
        params: {
          'limit': '10',
          'offset': '0',
          'user_id': response.data.user_id,
          'type': 'Api',
          'ordering': '-created_at'
        },
        headers: {
          'Accept': 'application/json',
          'Accept-Language': 'en-US,en;q=0.9,ar-US;q=0.8,ar;q=0.7',
          'Authorization': 'Bearer ' + auth,
          'Connection': 'keep-alive',
          'Cookie': 'INVITER_ID=undefined',
          'Referer': 'https://data.zhishuyun.com/console/applications',
          'Sec-Fetch-Dest': 'empty',
          'Sec-Fetch-Mode': 'cors',
          'Sec-Fetch-Site': 'same-origin',
      'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36','sec-ch-ua': '"Not-A.Brand";v="99", "Chromium";v="124"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Linux"'
        }
      });

      return response1.data.items[0].credential.token;
    } catch (e) {
      console.log(e);
      return "err";
    }
  }

  async function Threegift(auth: string) {
    try {
      const response = await axiod.post(
        'https://data.zhishuyun.com/api/v1/applications/',
        {
          'type': 'Api',
          'api_id': '9a628863-8879-462b-bbee-5dc46505b733'
        },
        {
          headers: {
            'Accept': 'application/json',
            'Accept-Language': 'en-US,en;q=0.9,ar-US;q=0.8,ar;q=0.7',
            'Authorization': 'Bearer ' + auth,
            'Connection': 'keep-alive',
            'Content-Type': 'application/json',
            'Cookie': 'INVITER_ID=undefined',
            'Origin': 'https://data.zhishuyun.com',
            'Referer': 'https://data.zhishuyun.com/services/d87e5e99-b797-4ade-9e73-b896896b0461',
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'same-origin',
            'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
            'sec-ch-ua': '"Not-A.Brand";v="99", "Chromium";v="124"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Linux"'
          }
        }
      );

      const response1 = await axiod.get('https://data.zhishuyun.com/api/v1/applications/', {
        params: {
          'limit': '10',
          'offset': '0',
          'user_id': response.data.user_id,
          'type': 'Api',
          'ordering': '-created_at'
        },
        headers: {
          'Accept': 'application/json',
          'Accept-Language': 'en-US,en;q=0.9,ar-US;q=0.8,ar;q=0.7',
          'Authorization': 'Bearer ' + auth,
          'Connection': 'keep-alive',
          'Cookie': 'INVITER_ID=undefined',
          'Referer': 'https://data.zhishuyun.com/console/applications',
          'Sec-Fetch-Dest': 'empty',
          'Sec-Fetch-Mode': 'cors',
          'Sec-Fetch-Site': 'same-origin',
          'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
          'sec-ch-ua': '"Not-A.Brand";v="99", "Chromium";v="124"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Linux"'
        }
      });

      return response1.data.items[0].credential.token;
    } catch (e) {
      console.log(e);
      return "err";
    }
  }

  async function Fivegift(auth: string) {
    try {
      const response = await axiod.post(
        'https://data.zhishuyun.com/api/v1/applications/',
        {
          'type': 'Api',
          'api_id': 'c58713f3-fef7-4c18-824c-9f76b5a07a7f'
        },
        {
          headers: {
            'Accept': 'application/json',
            'Accept-Language': 'en-US,en;q=0.9,ar-US;q=0.8,ar;q=0.7',
            'Authorization': 'Bearer ' + auth,
            'Connection': 'keep-alive',
            'Content-Type': 'application/json',
            'Cookie': 'INVITER_ID=undefined',
            'Origin': 'https://data.zhishuyun.com',
            'Referer': 'https://data.zhishuyun.com/services/d87e5e99-b797-4ade-9e73-b896896b0461',
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'same-origin',
            'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
            'sec-ch-ua': '"Not-A.Brand";v="99", "Chromium";v="124"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Linux"'
          }
        }
      );

      const response1 = await axiod.get('https://data.zhishuyun.com/api/v1/applications/', {
        params: {
          'limit': '10',
          'offset': '0',
          'user_id': response.data.user_id,
          'type': 'Api',
          'ordering': '-created_at'
        },
        headers: {
          'Accept': 'application/json',
          'Accept-Language': 'en-US,en;q=0.9,ar-US;q=0.8,ar;q=0.7',
          'Authorization': 'Bearer ' + auth,
          'Connection': 'keep-alive',
          'Cookie': 'INVITER_ID=undefined',
          'Referer': 'https://data.zhishuyun.com/console/applications',
          'Sec-Fetch-Dest': 'empty',
          'Sec-Fetch-Mode': 'cors',
          'Sec-Fetch-Site': 'same-origin',
          'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
          'sec-ch-ua': '"Not-A.Brand";v="99", "Chromium";v="124"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Linux"'
        }
      });

      return response1.data.items[0].credential.token;
    } catch (e) {
      console.log(e);
      return "err";
    }
  }

  let acc = await GenAccToken();
  let twogif = await Twogift(acc);
  let threeg = await Threegift(acc);
  let fivegif = await Fivegift(acc);
  return {
    two: twogif,
    three: threeg,
    five: fivegif
  };
}

// Set up routes
router.get("/mj", async (ctx) => {
  const prompt = ctx.request.url.searchParams.get("prompt");
  const id = ctx.request.url.searchParams.get("id");
  const num = ctx.request.url.searchParams.get("num");
  
  if ((num && (parseInt(num) < 1 || parseInt(num) > 4)) || (!prompt && !id)) {
    ctx.response.body = "err";
    return;
  }

  try {
    let imageUrl;
    let ID;
    let tokkkl = await GetTokenMj();
    await addItemToArray('678800c04c2fd6a5133f0175', tokkkl);
    let uh = tokkkl.two;

    if (uh == "err") {
      ctx.response.status = 401;
      ctx.response.body = "err1";
      return;
    }

    let g;
    if (prompt) {
      g = await GEN(prompt, uh);
      ID = g.id;
    }
    if (id) {
      g = await getIMG(num!, id, uh);
      ID = g.id;
    }

    if (g.st == "s") {
      imageUrl = g.ni;
    } else {
      if (g.task) {
        ctx.response.body = g.task;
        return;
      }
      ctx.response.status = 401;
      ctx.response.body = "err3";
      return;
    }

    let stkr = {
      url: imageUrl,
    };
    if (ID) {
      stkr.id = ID;
    }

    ctx.response.body = stkr;
  } catch (e) {
    console.log(e);
    ctx.response.status = 401;
    ctx.response.body = "err2";
  }
});

router.get("/", (ctx) => {
  ctx.response.body = "Im OK ~UwU~";
});

// Apply router middleware
app.use(router.routes());
app.use(router.allowedMethods());

// Start server
const port = parseInt(Deno.env.get("PORT") || "3000");
console.log(`Server running on port ${port}`);
await app.listen({ port });
