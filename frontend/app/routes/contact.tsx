import { Form, useActionData, useNavigation, useLoaderData } from "react-router";
import type { Route } from "./+types/contact";
import { sendContactMessage, getPortfolioData } from "~/services/api"; // Import thêm getPortfolioData
import type { PortfolioData } from "~/types/api";

// --- LOADER: Lấy thông tin liên hệ của chủ web ---
export async function loader() {
  try {
    const data = await getPortfolioData();
    return { profile: data.profile };
  } catch (error) {
    return { profile: null };
  }
}

// --- ACTION: Xử lý gửi form ---
export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  
  // Validate cơ bản (Backend sẽ validate kỹ hơn)
  if (!data.name || !data.email || !data.message) {
      return { error: "Vui lòng điền đầy đủ các trường bắt buộc." };
  }

  try {
    await sendContactMessage(data);
    return { success: true };
  } catch (error: any) {
    return { error: error.message || "Không thể gửi tin nhắn. Vui lòng thử lại sau." };
  }
}

export default function Contact() {
  const { profile } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  // Danh sách mạng xã hội (Fallback nếu profile chưa có)
  const socialLinks = profile?.social_links || [];

  return (
    <div className="max-w-6xl mx-auto px-6 py-16 md:py-24">
      
      <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start">
        
        {/* --- LEFT COLUMN: INFO --- */}
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
              Liên hệ
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Bạn có ý tưởng dự án thú vị, muốn thảo luận về công nghệ, hay chỉ đơn giản là muốn kết nối? 
              Hãy gửi tin nhắn cho tôi hoặc liên hệ qua các kênh dưới đây.
            </p>
          </div>

          <div className="space-y-6">
             {/* Email Info */}
             <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                </div>
                <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Email</h3>
                    <a href={`mailto:${profile?.public_email || "contact@example.com"}`} className="text-gray-600 dark:text-gray-400 hover:text-blue-600 transition">
                        {profile?.public_email || "contact@example.com"}
                    </a>
                </div>
             </div>

             {/* Location Info */}
             <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded-full flex items-center justify-center">
                   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                </div>
                <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Địa điểm</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                        {profile?.location || "Ho Chi Minh City, Vietnam"}
                    </p>
                </div>
             </div>

             {/* Social Links */}
             {socialLinks.length > 0 && (
                 <div className="pt-6 border-t border-gray-100 dark:border-gray-800">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Mạng xã hội</h3>
                    <div className="flex gap-4">
                        {socialLinks.map((link: any, idx: number) => (
                             <a 
                                key={idx} 
                                href={link.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-blue-600 transition"
                             >
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 6 2 7.8 2 14v1.7a1 1 0 0 1-2 1h-2a1 1 0 0 1-2-1v-4a8 8 0 0 0-1-4.8c-1.2 0-2.3 1-3.3 2.7 1-1.3 2-3 4.3-3h1.7a1 1 0 0 1 1 2v4a2 2 0 0 1-2 2h-2z"/><circle cx="12" cy="12" r="10"/></svg>
                             </a>
                        ))}
                    </div>
                 </div>
             )}
          </div>
        </div>

        {/* --- RIGHT COLUMN: FORM --- */}
        <div className="bg-white dark:bg-gray-900 p-8 md:p-10 rounded-3xl shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-800">
          {actionData?.success ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
               <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 animate-bounce">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>
               </div>
               <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Đã gửi thành công!</h3>
               <p className="text-gray-500 mb-8">Cảm ơn bạn đã liên hệ. Tôi sẽ phản hồi sớm nhất có thể.</p>
               <a href="/contact" className="text-blue-600 font-medium hover:underline">
                 Gửi tin nhắn khác
               </a>
            </div>
          ) : (
            <Form method="post" className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Gửi tin nhắn</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Họ tên</label>
                    <input 
                        name="name" 
                        required 
                        placeholder="Nguyen Van A"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:bg-white dark:focus:bg-gray-950 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900 transition-all outline-none" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                    <input 
                        name="email" 
                        type="email" 
                        required 
                        placeholder="name@example.com"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:bg-white dark:focus:bg-gray-950 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900 transition-all outline-none" 
                    />
                  </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Lời nhắn</label>
                <textarea 
                    name="message" 
                    rows={5} 
                    required 
                    placeholder="Nội dung trao đổi..." 
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:bg-white dark:focus:bg-gray-950 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900 transition-all outline-none resize-none" 
                />
              </div>

              {actionData?.error && (
                  <div className="p-4 rounded-lg bg-red-50 text-red-600 text-sm flex items-center gap-2">
                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
                     {actionData.error}
                  </div>
              )}

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed transform active:scale-[0.98]"
              >
                {isSubmitting ? (
                    <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Đang gửi...
                    </>
                ) : (
                    <>
                        Gửi tin nhắn 
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" x2="11" y1="2" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                    </>
                )}
              </button>
            </Form>
          )}
        </div>
      </div>
    </div>
  );
}