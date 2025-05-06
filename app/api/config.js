// API 配置

// 基础URL
export const API_BASE_URL = 'http://116.205.143.103:3000/api/v1';

// 默认请求头
export const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
};

// 固定授权令牌（免登录访问）
export const AUTH_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidTEyMzQ1NiIsInVzZXJuYW1lIjoiemhhbmdzYW4iLCJpYXQiOjE2MDAwMDAwMDAsImV4cCI6MTkwMDAwMDAwMH0.bsvYDYGKnpV3KjX7BTNUlCv7kIVE8Viy-4_fN4GpjnA';

// 自定义错误类
export class ApiError extends Error {
  constructor(message, status, data) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

// 请求超时时间 (毫秒)
export const REQUEST_TIMEOUT = 15000; 