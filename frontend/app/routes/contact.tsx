import { Form, useActionData, useNavigation } from "react-router";
import type { Route } from "./+types/contact";
import { sendContactMessage } from "~/services/api";

// Xử lý gửi form
export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  
  try {
    await sendContactMessage(data); // POST tới API /api/contact/
    return { success: true };
  } catch (error) {
    return { error: "Không thể gửi tin nhắn. Vui lòng thử lại." };
  }
}

export default function Contact() {
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="max-w-xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-4 text-center">Liên hệ</h1>
      <p className="text-center text-gray-600 dark:text-gray-400 mb-10">
        Bạn có câu hỏi hoặc muốn hợp tác? Hãy để lại lời nhắn.
      </p>

      {actionData?.success ? (
        <div className="p-6 bg-green-50 text-green-700 rounded-xl text-center">
          <h3 className="font-bold text-lg">Đã gửi tin nhắn!</h3>
          <p>Cảm ơn bạn đã liên hệ, tôi sẽ phản hồi sớm nhất có thể.</p>
        </div>
      ) : (
        <Form method="post" className="space-y-6 bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800">
          <div>
            <label className="block text-sm font-medium mb-2">Họ tên</label>
            <input name="name" required className="w-full px-4 py-2 rounded-lg border dark:bg-gray-800 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Nguyen Van A" />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input name="email" type="email" required className="w-full px-4 py-2 rounded-lg border dark:bg-gray-800 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="email@example.com" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Lời nhắn</label>
            <textarea name="message" rows={4} required className="w-full px-4 py-2 rounded-lg border dark:bg-gray-800 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Nội dung trao đổi..." />
          </div>

          {actionData?.error && <p className="text-red-500 text-sm">{actionData.error}</p>}

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition disabled:opacity-50"
          >
            {isSubmitting ? "Đang gửi..." : "Gửi tin nhắn"}
          </button>
        </Form>
      )}
    </div>
  );
}