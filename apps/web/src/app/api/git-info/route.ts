import gitCommitInfo from 'git-commit-info';
import { NextResponse } from 'next/server';

export async function GET() {
  const gitInfo = gitCommitInfo();

  return NextResponse.json(gitInfo);
}
