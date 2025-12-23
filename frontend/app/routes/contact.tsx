import { useState } from "react";
import { postContact } from "~/services/api";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<null | string>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      await postContact({ name, email, message });
      setStatus("ok");
      setName(""); setEmail(""); setMessage("");
    } catch (err) {
      setStatus("error");
    }
  }

  return (
    <main className="min-h-screen py-12 px-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Liên hệ</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Tên</label>
            <input value={name} onChange={(e) => setName(e.target.value)} className="mt-1 block w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 block w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium">Nội dung</label>
            <textarea value={message} onChange={(e) => setMessage(e.target.value)} className="mt-1 block w-full border rounded px-3 py-2" rows={6} />
          </div>
          <div>
            <button type="submit" className="bg-black text-white px-4 py-2 rounded">Gửi</button>
          </div>
          {status === "ok" && <p className="text-green-600">Gửi thành công.</p>}
          {status === "error" && <p className="text-red-600">Gửi thất bại, thử lại sau.</p>}
        </form>
      </div>
    </main>
  );
}
