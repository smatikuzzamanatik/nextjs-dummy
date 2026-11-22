.PHONY: help install dev build start lint format typecheck check clean

help:
	@echo "Bazar Dor (বাজার দর) — Project Commands"
	@echo "---------------------------------------"
	@echo "make install    : Install project dependencies"
	@echo "make dev        : Start development server"
	@echo "make build      : Create optimized production build"
	@echo "make start      : Run production server"
	@echo "make lint       : Run ESLint checks"
	@echo "make format     : Format code with Prettier"
	@echo "make typecheck  : Run TypeScript type checker"
	@echo "make check      : Run all validation checks (typecheck + lint + build)"
	@echo "make clean      : Clean build artifacts (.next)"

install:
	pnpm install

dev:
	pnpm dev

build:
	pnpm build

start:
	pnpm start

lint:
	pnpm lint

format:
	pnpm format

typecheck:
	pnpm typecheck

check: typecheck lint build

clean:
	rm -rf .next

