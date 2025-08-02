"use client";

import { User, Lock } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Button } from "./ui/button";
import React, { useState } from "react";

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
  onLoginSuccess: (user: { email: string }) => void;
}

export default function LoginModal({
  open,
  onClose,
  onLoginSuccess,
}: LoginModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      setError("아이디와 비밀번호 모두 입력해주세요");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("userEmail", data.email);
        onLoginSuccess({ email: data.email });
      } else {
        const err = await res.json();
        setError(err.message || "로그인에 실패했습니다");
      }
    } catch {
      setError("네트워크 에러");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md z-[100]">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            로그인
          </DialogTitle>
          <DialogDescription className="sr-only">
            로그인 모달입니다.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <User className="h-4 w-4" />
                아이디
              </label>
              <input
                className="w-full border rounded px-3 py-2"
                type="email"
                placeholder="이메일을 입력하세요"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Lock className="h-4 w-4" />
                비밀번호
              </label>
              <input
                className="w-full border rounded px-3 py-2"
                type="password"
                placeholder="비밀번호를 입력하세요"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && <p className="text-sm text-red-600 text-center">{error}</p>}

          <Button
            onClick={handleLogin}
            className="w-full bg-emerald-600 hover:bg-emerald-700"
            disabled={loading}
          >
            {loading ? "로그인 중…" : "로그인"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
