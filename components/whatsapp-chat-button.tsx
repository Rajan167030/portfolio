"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { X, Send } from "lucide-react"

interface WhatsAppChatButtonProps {
  phoneNumber: string
  welcomeMessage?: string
}

// WhatsApp Logo SVG Component
const WhatsAppIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488" />
  </svg>
)

export default function WhatsAppChatButton({
  phoneNumber,
  welcomeMessage = "Hello! I'm interested in working with you.",
}: WhatsAppChatButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState(welcomeMessage)
  const formattedPhoneNumber = phoneNumber.replace(/\D/g, "") // Remove non-digits

  // WhatsApp deep link with pre-filled message
  const getWhatsAppLink = () => {
    return `https://wa.me/${formattedPhoneNumber}?text=${encodeURIComponent(message)}`
  }

  return (
    <>
      {/* Main floating button */}
      <motion.button
        className="fixed bottom-6 right-6 z-40 w-16 h-16 rounded-full bg-gradient-to-br from-[#25D366] to-[#128C7E] flex items-center justify-center shadow-2xl border-2 border-white/20"
        whileHover={{
          scale: 1.1,
          boxShadow: "0 0 30px rgba(37, 211, 102, 0.6)",
          rotate: [0, -10, 10, 0],
        }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
          {isOpen ? <X className="text-white w-7 h-7" /> : <WhatsAppIcon className="text-white w-8 h-8" />}
        </motion.div>

        {/* Pulsing ring animation */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-[#25D366]"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.8, 0, 0.8],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        {/* Online indicator */}
        <motion.div
          className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"
          animate={{
            scale: [1, 1.2, 1],
            boxShadow: [
              "0 0 0px rgba(34, 197, 94, 0.4)",
              "0 0 10px rgba(34, 197, 94, 0.8)",
              "0 0 0px rgba(34, 197, 94, 0.4)",
            ],
          }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        />
      </motion.button>

      {/* Chat popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 z-30 w-80 rounded-2xl overflow-hidden shadow-2xl border border-white/20 backdrop-blur-sm"
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#075E54] to-[#128C7E] p-4 flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm border border-white/30">
                <WhatsAppIcon className="text-white w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-semibold text-lg">WhatsApp Chat</h3>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <p className="text-white/80 text-sm">Online • Typically replies instantly</p>
                </div>
              </div>
            </div>

            {/* Chat body */}
            <div className="bg-gradient-to-b from-[#E5DDD5] to-[#D1C7B7] p-4 h-64 overflow-y-auto">
              {/* Incoming message */}
              <motion.div
                className="bg-white rounded-2xl rounded-bl-md p-3 max-w-[85%] shadow-sm relative ml-auto mb-4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <p className="text-sm text-gray-700">Hi there! 👋 I'm Rajan. How can I help you today?</p>
                <span className="text-[10px] text-gray-500 absolute bottom-1 right-2">12:00</span>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-white rotate-45"></div>
              </motion.div>

              {/* Outgoing message */}
              <motion.div
                className="bg-gradient-to-r from-[#DCF8C6] to-[#D4F4AA] rounded-2xl rounded-br-md p-3 max-w-[85%] shadow-sm relative mr-auto mb-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <p className="text-sm text-gray-700">
                  I'm looking for a skilled developer for my project. Are you available?
                </p>
                <span className="text-[10px] text-gray-500 absolute bottom-1 right-2">12:01</span>
                <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-[#DCF8C6] rotate-45"></div>
              </motion.div>

              {/* Response message */}
              <motion.div
                className="bg-white rounded-2xl rounded-bl-md p-3 max-w-[85%] shadow-sm relative ml-auto"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <p className="text-sm text-gray-700">
                  Yes, I'm currently taking on new projects! Feel free to message me on WhatsApp to discuss details. 🚀
                </p>
                <span className="text-[10px] text-gray-500 absolute bottom-1 right-2">12:02</span>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-white rotate-45"></div>
              </motion.div>
            </div>

            {/* Input area */}
            <div className="bg-white p-4 border-t border-gray-100">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 border border-gray-200 rounded-full px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:border-transparent transition-all"
                />
                <Link
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white rounded-full w-12 h-12 flex items-center justify-center hover:shadow-lg hover:scale-105 transition-all duration-200"
                >
                  <Send className="w-5 h-5" />
                </Link>
              </div>
              <p className="text-xs text-gray-500 mt-3 text-center flex items-center justify-center gap-1">
                <WhatsAppIcon className="w-3 h-3" />
                Click send to continue in WhatsApp
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
